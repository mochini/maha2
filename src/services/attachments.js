import Attachment from '../models/attachment'
import Service from '../models/service'
import getUrls from 'get-urls'
import cheerio from 'cheerio'
import request from 'request'
import og from 'open-graph'
import _ from 'lodash'
import Url from 'url'
import os from 'os'

const ifaces = os.networkInterfaces()

const domains = [
  'localhost',
  'dev.mahaplatform.com',
  process.env.DOMAIN,
  ...!_.isEmpty(process.env.DATA_ASSET_HOST) ? [Url.parse(process.env.DATA_ASSET_HOST).hostname] : [],
  ...!_.isEmpty(process.env.DATA_ASSET_CDN_HOST) ? [Url.parse(process.env.DATA_ASSET_CDN_HOST).hostname] : []
]

const localhosts = Object.keys(ifaces).reduce((ips, iface) => [
  ...ips,
  ...ifaces[iface].map(adapter => adapter.address)
], domains)

const download = async (url) => await new Promise((resolve, reject) => {

  request({
    url: url,
    rejectUnauthorized: false,
    encoding: 'utf8',
    gzip: true,
    jar: true
  }, (err, res, body) => {

    if(err) return reject(err)

    return resolve(res)

  })

})

const getMetaData = async (url, trx) => {

  const uri = Url.parse(url)

  if(_.includes(localhosts, uri.hostname)) return processLocalUrl(url, uri)

  const response = await download(url)

  if(response.statusCode !== 200) return null

  const type = response.headers['content-type'].split('/')[0]

  if(type === 'image') return processImageUrl(url, response)

  return processOpenGraphUrl(uri, url, response, trx)

}

const processLocalUrl = (url, uri) => {

  const matches = uri.pathname.match(/assets\/(\d*)\/.*/)

  if(matches) return {
    type: 'asset',
    asset_id: matches[1],
    title_link: url
  }

  return processLocalPathname(uri.pathname)

}

const processLocalPathname = (pathname) => {

  return {
    type: 'local',
    title_link: pathname
  }

}

const processImageUrl = (url, response) => ({
  type: 'image',
  image_url: url
})

const processOpenGraphUrl = async (uri, url, response, trx) => {

  const meta = og.parse(response.body)

  const $ = cheerio.load(response.body)

  const service = await getService($, url, trx)

  if(Object.keys(meta).length > 0) {
    return {
      service_id: service.get('id'),
      text: meta.description ? meta.description.substr(0, 255) : '',
      title: meta.title,
      title_link: meta.url,
      type: getType(meta),
      ...getImage(uri, meta.image),
      ...getVideo(uri, meta.video)
    }
  }

  return {
    service_id: service.get('id'),
    text: $('meta[name=description]').attr('content') || $('meta[name=Description]').attr('content') || '',
    title: $('title').eq(0).text(),
    title_link: url,
    type: 'link'
  }

}

const unpackOgArray = (value) => {

  if(!value) return null

  if(_.isArray(value)) return value[0]

  return value

}

const getService = async ($, url, trx) => {

  const uri = Url.parse(url)

  const name = uri.hostname

  const service = await Service.where({ name }).fetch({ transacting: trx })

  if(service) return service

  const icons = [
    ...$('link[rel="icon"]').toArray(),
    ...$('link[rel="shortcut icon"]').toArray(),
    ...$('link[rel="Shortcut Icon"]').toArray(),
    ...$('link[rel="apple-touch-icon"]').toArray(),
    ...$('link[rel="image_src"]').toArray()
  ].sort((a, b) => {
    if(a.attribs.sizes > b.attribs.sizes) return -1
    if(a.attribs.sizes < b.attribs.sizes) return 1
    return 0
  })

  const href = icons.length > 0 ? icons[0].attribs.href : null

  const icon = href ? absoluteUrl(uri, href) : null

  return await Service.forge({ name, icon }).save(null, { transacting: trx })

}

const getType = (meta) => {

  if(meta.type.match(/video/)) return 'video'

  return 'link'

}

const getImage = (uri, image) => {

  if(!image) return {}

  const image_url = image.secure_url ? unpackOgArray(image.secure_url) : unpackOgArray(image.url)

  return {
    image_url: absoluteUrl(uri, image_url),
    image_width: unpackOgArray(image.width),
    image_height:  unpackOgArray(image.height)
  }

}

const getVideo = (uri, video) => {

  if(!video) return {}

  const video_url = video.secure_url ? unpackOgArray(video.secure_url) : unpackOgArray(video.url)

  return {
    video_url: absoluteUrl(uri, video_url),
    video_width: unpackOgArray(video.width),
    video_height: unpackOgArray(video.height)
  }

}

const absoluteUrl = (uri, url) => {

  return Url.resolve(`${uri.protocol}//${uri.host}/${uri.pathname}`, url)

}

const createAttachment = async (attachable, index, url, trx) => {

  const meta = await getMetaData(url, trx)

  if(!meta) return null

  const data = {
    team_id: attachable.get('team_id'),
    attachable_type: attachable.tableName,
    attachable_id: attachable.get('id'),
    delta: index,
    from_url: url,
    ...meta
  }

  await Attachment.forge(data).save(null, { transacting: trx })

}

export const extractAttachments = async (attachable, text, trx) => {

  const urls = getUrls(text, {
    sortQueryParameters: false,
    removeTrailingSlash: true,
    stripWWW: false,
    stripFragment: false,
    normalizeProtocol: false
  })

  if(urls.size === 0) return

  await Promise.mapSeries(urls, async(url, index) => {

    const normalizedUrl = normalizeUrl(text, url)

    await createAttachment(attachable, index, normalizedUrl, trx)

  })


}

const normalizeUrl = (text, url) => {

  let normalized = url.replace('?null', '')

  if(text.search(normalized) < 0) {
    normalized = normalized.replace(/\/+$/, '')
  }

  return normalized

}
