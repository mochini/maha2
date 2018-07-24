import Queue from '../../objects/queue'
import aws from '../../lib/aws'
import path from 'path'

const enqueue = async (req, trx, message) => message

const processor = async (job, trx) => {

  const { filepath, meta, code } = job.data

  const s3 = new aws.S3()

  const Key = `emails/${code}`

  const file = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key
  }).promise()

  const mailbox = require(path.resolve(filepath)).default

  const email = JSON.parse(file.Body)

  await mailbox.processor(meta, email, trx)

  await s3.deleteObjects({
    Bucket: process.env.AWS_BUCKET,
    Delete: {
      Objects: [
        { Key }
      ]
    }
  }).promise()

}

const mailboxQueue = new Queue({
  name: 'mailbox',
  enqueue,
  processor
})

export default mailboxQueue
