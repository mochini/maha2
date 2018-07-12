import collectObjects from '../utils/collect_objects'
import { info } from '../utils/console'
import path from 'path'

const worker = async () => {

  const queueFiles = collectObjects('queues/*_queue')

  await Promise.map(queueFiles, async (queueFile) => {

    info('queue', `Starting queue ${queueFile}`)

    const queue = require(path.resolve(queueFile)).default

  })

}

export default worker
