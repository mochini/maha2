import ShipitMaha from 'shipit-maha'
import Shipit from 'shipit-cli'
import path from 'path'

const shipfile = path.resolve('config', 'deploy.js')

export const shipit = async (flags, args) => {

  const shipit = new Shipit({ environment: args.environment })

  const config = require(shipfile)

  await shipit.initConfig(config)

  await ShipitMaha(shipit)

  shipit.initialize()

  shipit.start(args.command)

  shipit.on('task_err', (err) => {

    process.exit(1)

  })

  shipit.on('task_not_found', () => {

    process.exit(1)

  })

}

export default shipit
