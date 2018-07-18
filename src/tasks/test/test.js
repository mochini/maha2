import collectObjects from '../../utils/collect_objects'
import { info } from '../../utils/console'
import serverWatch from '../../utils/watch'
import Mocha from 'mocha'

export const run = (flags, args) => serverWatch('test', 'test:run')

export const test = async (flags, args) => {

  info('test', 'Running tests')

  const mocha = new Mocha()

  mocha.reporter('list')

  collectObjects('tests/**/*_test').map((test) => {

    mocha.addFile(test)

  })

  await new Promise((resolve, reject) => {

    const runner = mocha.run(resolve)

    runner.on('test', () => {})

    runner.on('test end', () => {})

    runner.on('end', () => {})

  })

}
