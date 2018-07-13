// import { prepareTestDb, beginTransaction, rollbackTransaction } from 'core/dist/maha_test'
import collectObjects from '../../utils/collect_objects'
import Mocha from 'mocha'
import path from 'path'

export const test = () => {

  const mocha = new Mocha()

  collectObjects('tests/**/*_test').map((test) => {

    mocha.addFile(path.join(test))

  })

  mocha.before = async (done) => {

    this.timeout(10000)

    console.log('before')

    // prepareTestDb().then(() => done())

  }
  // 
  // mocha.beforeEach(async (done) => {
  //
  //   console.log('beforeEach')
  //
  //   // beginTransaction().then(() => done())
  //
  // })
  //
  // mocha.afterEach(async (done) => {
  //
  //   console.log('afterEach')
  //
  //   // rollbackTransaction().then(() => done())
  //
  // })


  mocha.run((failures) => {

    process.exitCode = failures ? -1 : 0

  })
}
