import collectObjects from '../utils/collect_objects'
import { info } from '../utils/console'
import later from 'later'
import path from 'path'

const cron = async () => {

  const cronFiles = collectObjects('cron/*_cron')

  await Promise.map(cronFiles, async (cronFile) => {

    info('cron', `Scheduling job ${cronFile}`)

    const cron = require(path.resolve(cronFile)).default

    const schedule = later.parse.cron(cron.schedule, true)

    later.setInterval(cron.handler, schedule)

  })

}

export default cron
