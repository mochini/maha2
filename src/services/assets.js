import AssetSerializer from '../serializers/asset_serializer'
import AssembleAssetQueue from '../queues/assemble_asset_queue'
import ProcessAssetQueue from '../queues/process_asset_queue'
import { BackframeError } from 'backframe'
import Asset from '../models/asset'
import socket from '../lib/emitter'
import webshot from 'webshot'
import aws from '../lib/aws'
import mkdirp from 'mkdirp'
import path from 'path'
import Jimp from 'jimp'
import _ from 'lodash'
import fs from 'fs'

const simpleParser = Promise.promisify(require('mailparser').simpleParser)

const execAsync = Promise.promisify(require('child_process').exec)

export const validateRequest = (params, files, requireFile) => {

  const maxChunkSize = 1024 * 128

  const maxFileSize = 1024 * 1024 * 20

  const chunkNumber = params.resumableChunkNumber

  const chunkSize = params.resumableChunkSize

  const totalSize = params.resumableTotalSize

  const identifier = params.resumableIdentifier

  const filename = params.resumableFilename

  const totalChunks = params.resumableTotalChunks

  if (!chunkNumber || !chunkSize || !totalSize || !identifier || !filename || !totalChunks) {
    throw new BackframeError({ code: 500, message: 'non_resumable_request' })
  }

  if (parseInt(chunkNumber) > parseInt(totalChunks)) {
    throw new BackframeError({ code: 500, message: 'invalid_resumable_request1' })
  }

  if(parseInt(chunkSize) > parseInt(maxChunkSize)) {
    throw new BackframeError({ code: 500, message: 'invalid_resumable_request2' })
  }

  if(parseInt(totalSize) > parseInt(maxFileSize)) {
    throw new BackframeError({ code: 500, message: 'invalid_resumable_request3' })
  }

  if(!requireFile) return

  const filesize = files['file'].size

  if(!files['file'] || !files['file'].size) {
    throw new BackframeError({ code: 500, message: 'invalid_resumable_request4' })
  }

  if(parseInt(chunkNumber) < parseInt(totalChunks) && parseInt(filesize) != parseInt(chunkSize)) {
    throw new BackframeError({ code: 500, message: 'invalid_resumable_request5' })
  }

}

export const checkUploadedFile = async (req, trx) => {

  const chunkFilename = _getChunkFilename(req.query.resumableIdentifier, req.query.resumableChunkNumber)

  const exists = await _chunkExists(chunkFilename)

  if(!exists) {
    throw new BackframeError({ code: 204, message: 'not_found' })
  }

  return 'found'

}

export const uploadChunk = async (req, trx) => {

  const identifier = _cleanIdentifier(req.body.resumableIdentifier)

  const chunkFilename = _getChunkFilename(identifier, req.body.resumableChunkNumber)

  fs.renameSync(req.files['file'].path, chunkFilename)

  const filedata = fs.readFileSync(chunkFilename)

  await _saveFile(filedata, chunkFilename, 'application/octet-stream')

  await _unlinkChunk(chunkFilename)

  const chunks = await _listChunks()

  const chunkArray = [...Array(parseInt(req.body.resumableTotalChunks))]

  const completed = chunkArray.reduce((completed, chunk, index) => {

    return completed ? _.includes(chunks, _getChunkFilename(identifier, index + 1)) : false

  }, true)

  if(!completed) return 'partly_done'

  const data = {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: 1,
    original_file_name: req.body.resumableFilename,
    file_name: _getNormalizedFileName(req.body.resumableFilename),
    content_type: req.body.resumableType,
    file_size: req.body.resumableTotalSize,
    chunks_total: req.body.resumableTotalChunks,
    status_id: 1
  }

  const asset = await Asset.forge(data).save(null, { transacting: trx })

  if(!asset) throw new BackframeError({ code: 500, message: 'Unable to create asset' })

  await AssembleAssetQueue.enqueue(req, trx, asset.get('id'))

  return await AssetSerializer(req, trx, asset)

}

export const assembleAsset = async (id, trx) => {

  const asset = await Asset.where({ id }).fetch({ transacting: trx })

  if(!asset) throw new Error('Unable to find asset' )

  const fileData = await _getAssembledData(asset)

  const normalizedData = await _getNormalizedData(asset, fileData)

  await _saveFile(normalizedData, `assets/${asset.get('id')}/${asset.get('file_name')}`, asset.get('content_type'))

  await _deleteChunks(asset)

  const status_id = asset.get('has_preview') ? 2 : 3

  await asset.save({ status_id }, { transacting: trx })

  if(asset.get('has_preview')) await ProcessAssetQueue.enqueue(null, trx, asset.get('id'))

  await socket.in(`/assets/${asset.get('id')}`).emit('message', {
    target: `/assets/${asset.get('id')}`,
    action: 'refresh',
    data: AssetSerializer(null, null, asset)
  })

}

export const processAsset = async (id, trx) => {

  const asset = await Asset.where({ id }).fetch({ transacting: trx })

  if(!asset) throw new Error('Unable to find asset' )

  const fileData = await _getAsset(asset)

  const previewData = await _getPreviewData(asset, fileData, 'jpg')

  await _saveFile(previewData, `assets/${asset.get('id')}/preview.jpg`, 'image/jpeg')

  await asset.save({ status_id: 3 }, { transacting: trx })

  await socket.in(`/assets/${asset.get('id')}`).emit('message', {
    target: `/assets/${asset.get('id')}`,
    action: 'refresh',
    data: AssetSerializer(null, null, asset)
  })

}

export const getAsset = async (id, trx) => {

  const asset = await Asset.where({ id }).fetch({ transacting: trx })

  if(!asset) throw new Error('Unable to find asset' )

  return await _getAsset(asset)

}

export const createAsset = async (meta, trx) => {

  const file_size = meta.file_size || _getFilesize(meta.file_data)

  const data = {
    team_id: meta.team_id,
    user_id: meta.user_id,
    source_id: meta.source_id,
    source_identifier: meta.source_identifier,
    source_url: meta.source_url,
    original_file_name: meta.file_name,
    file_name: _getNormalizedFileName(meta.file_name),
    content_type: meta.content_type,
    file_size,
    chunks_total: 1,
    status_id: 2
  }

  const asset = await Asset.forge(data).save(null, { transacting: trx })

  const normalizedData = await _getNormalizedData(asset, meta.file_data)

  await _saveFile(normalizedData, `assets/${asset.get('id')}/${asset.get('file_name')}`, asset.get('content_type'))

  if(!asset.get('is_image')) {

    const previewData = await _getPreviewData(asset, normalizedData, 'jpg')

    await _saveFile(previewData, `assets/${asset.get('id')}/preview.jpg`, 'image/jpeg')

  }

  await asset.save({ status_id: 3 }, { transacting: trx })

  return asset

}

export const deleteAsset = async (asset, trx) => {

  const files = [`assets/${asset.get('id')}/${asset.get('file_name')}`]

  if(asset.get('has_preview')) files.push(`assets/${asset.get('id')}/preview.jpg`)

  await _deleteFiles(files)

  await asset.destroy({ transacting: trx })

}

const _getFilesize = (fileData) => {

  const random = _.random(100000000, 999999999).toString(36)

  const filePath = path.join('tmp', random)

  fs.writeFileSync(filePath, fileData)

  const fileStats = fs.statSync(filePath)

  fs.unlinkSync(filePath)

  return fileStats.size

}

export const _getNormalizedFileName = (filename) => {

  const matches = filename.toLowerCase().match(/^(.*)\.([^?]*)\??(.*)$/)

  const basename = matches ? matches[1] : filename.toLowerCase()

  const extension = matches ? matches[2] : null

  const rewritten = basename.replace(/[^0-9a-zA-Z-\s\_\.]/img, '').replace(/[\W\_]/img, '-').replace(/-{2,}/g, '-')

  return rewritten + (extension ? `.${extension}` : '')

}

const _chunkExists = async (filepath) => {

  const chunks = await _listChunks()

  return _.includes(chunks, filepath)

}

const _getAsset = async (asset) => {

  const Key = `assets/${asset.get('id')}/${asset.get('file_name')}`

  if(process.env.ASSET_STORAGE === 's3') {

    const s3 = _getS3()

    const file = await s3.getObject({
      Bucket: process.env.AWS_BUCKET,
      Key
    }).promise()

    return file.Body

  } else if(process.env.ASSET_STORAGE === 'local') {

    return fs.readFileSync(path.join('public', Key))

  }

}

const _getChunks = async (asset) => {

  const totalChunks = parseInt(asset.get('chunks_total'))

  const chunkArray = [...Array(parseInt(totalChunks))]

  const chunks = await Promise.mapSeries(chunkArray, async (item, index) => {

    const Key = `tmp/${asset.get('identifier')}.${index + 1}`

    if(process.env.ASSET_STORAGE === 's3') {

      const s3 = _getS3()

      const chunk = await s3.getObject({
        Bucket: process.env.AWS_BUCKET,
        Key
      }).promise()

      return chunk.Body

    } else if(process.env.ASSET_STORAGE === 'local') {

      return fs.readFileSync(path.join('public', Key))

    }

  })

  return chunks


}

const _listChunks = async () => {

  if(process.env.ASSET_STORAGE === 's3') {

    const s3 = _getS3()

    const parts = await s3.listObjects({
      Bucket: process.env.AWS_BUCKET,
      Prefix: 'tmp'
    }).promise()

    return parts.Contents.map(file => file.Key)

  } else if(process.env.ASSET_STORAGE === 'local') {

    return fs.readdirSync(path.join('public', 'tmp')).map(file => `tmp/${file}`)

  }

}

const _saveFile = async (filedata, filepath, content_type) => {

  if(process.env.ASSET_STORAGE === 's3') {

    const s3 = _getS3()

    await s3.upload({
      ACL: 'public-read',
      Body: filedata,
      Bucket: process.env.AWS_BUCKET,
      ContentType: content_type,
      Key: filepath
    }).promise()

  } else if(process.env.ASSET_STORAGE === 'local') {

    const assetpath = path.join('public', ...filepath.split('/').slice(0,-1))

    const assetname = filepath.split('/').pop()

    mkdirp.sync(assetpath)

    fs.writeFileSync(path.join(assetpath, assetname), filedata)

  }

}

const _deleteFiles = async (files) => {

  if(process.env.ASSET_STORAGE === 's3') {

    const s3 = _getS3()

    await s3.deleteObjects({
      Bucket: process.env.AWS_BUCKET,
      Delete: {
        Objects: files.map(Key => ({ Key }))
      }
    }).promise()

  } else if(process.env.ASSET_STORAGE === 'local') {

    files.map(Key => {

      fs.unlinkSync(path.join('public', Key))

    })

  }

}

const _deleteChunks = async (asset) => {

  const totalChunks = parseInt(asset.get('chunks_total'))

  const chunkArray = [...Array(parseInt(totalChunks))]

  const filepaths = chunkArray.map((i, index) => {

    return _getChunkFilename(asset.get('identifier'), index + 1)

  })

  if(process.env.ASSET_STORAGE === 's3') {

    await s3.deleteObjects({
      Bucket: process.env.AWS_BUCKET,
      Delete: {
        Objects: filepaths.map(Key => ({ Key }))
      }
    }).promise()

  } else if(process.env.ASSET_STORAGE === 'local') {

    Promise.mapSeries(filepaths, (filepath, index) => {

      fs.unlinkSync(path.join('public', filepath))

    })

  }

}

const _getAssembledData = async (asset) => {

  const chunks = await _getChunks(asset)

  return Buffer.concat(chunks)

}

const _getNormalizedData = async (asset, fileData) => {

  const content_type = asset.get('content_type')

  const isImage = content_type.match(/image/) && content_type !== 'image/gif'

  return isImage ? await _rotateImage(fileData) : fileData

}

const _getPreviewData = async (asset, fileData, ext) => {

  if(asset.get('extension') === 'xlsx') {

    const pdfData = await _convertOfficeFormat(fileData, 'pdf')

    return await _convertOfficeFormat(pdfData, 'jpg')

  }

  if(asset.get('content_type') === 'message/rfc822') {

    const email = await simpleParser(fileData)

    const emailData = email.html || email.textAsHtml

    return _convertHtml(emailData)

  }

  if(asset.get('content_type') === 'text/html') {

    return _convertHtml(fileData)

  }

  return await _convertOfficeFormat(fileData, 'jpg')

}

const _convertOfficeFormat = async (filedata, format) => {

  const random = _.random(100000000, 999999999).toString(36)

  const outDir = path.join('.', 'tmp')

  const filePath = path.join(outDir, random)

  const previewPath = path.join(outDir, `${random}.preview.${format}`)

  fs.writeFileSync(filePath, filedata)

  await execAsync(`soffice --convert-to preview.${format} --outdir ${outDir} ${filePath}`)

  const previewData = new Buffer(fs.readFileSync(previewPath), 'binary')

  fs.unlinkSync(filePath)

  fs.unlinkSync(previewPath)

  return previewData

}

const _convertHtml = async (html) => {

  return await new Promise((resolve, reject) => {

    const options = {
      siteType:'html',
      streamType: 'jpg',
      defaultWhiteBackground: true,
      shotSize: {
        width: 'window',
        height: 'all'
      }
    }

    const ws = webshot(html, options)

    const buffer = []

    ws.on('data', data => buffer.push(data))

    ws.on('error', err => reject(new Error(err)))

    ws.on('end', () => resolve(Buffer.concat(buffer)))

  })

}

const _unlinkChunk = async (filepath) => {

  fs.unlinkSync(filepath)

}

const _rotateImage = async (data) => {

  const image = await Jimp.read(data)

  if(!image) return data

  image.exifRotate()

  return await new Promise((resolve, reject) => {

    image.getBuffer(image.getMIME(), (err, buffer) => {

      if(err) reject(new Error(err))

      resolve(buffer)

    })

  })

}

let s3 = null

const _getS3 = () => {

  if(s3) return s3

  s3 = new aws.S3()

  return s3

}

const _cleanIdentifier = identifier => {
  return identifier.replace(/^0-9A-Za-z_-/img, '')
}

const _getChunkFilename = (identifier, chunkNumber, ) => {
  return path.join('.', 'tmp', _cleanIdentifier(identifier)+'.'+chunkNumber)
}
