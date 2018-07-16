// import { prepareTestDb, beginTransaction, rollbackTransaction } from 'core/dist/maha_test'
import collectObjects from '../../utils/collect_objects'
import Mocha from 'mocha'
import path from 'path'

export const test = async () => {

  const mocha = new Mocha()

  collectObjects('tests/**/*_test').map((test) => {

    mocha.addFile(test)

  })

  await new Promise((resolve, reject) => {

    const runner = mocha.run((err) => {

      if(err) reject(err)

      resolve()

    })

    runner.on('test', () => {})

    runner.on('test end', () => {})

  })

}
