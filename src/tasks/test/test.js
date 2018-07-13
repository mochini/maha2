import collectObjects from '../../utils/collect_objects'
import Mocha from 'mocha'
import path from 'path'

export const test = () => {

  const mocha = new Mocha()

  collectObjects('tests/**/*_test').map((test) => {

    mocha.addFile(path.join(test))

  })

  mocha.run((failures) => {

    process.exitCode = failures ? -1 : 0

  })
}
