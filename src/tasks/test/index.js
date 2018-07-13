import task from '../../objects/task'
import path from 'path'

const test = task({
  command: 'test',
  description: 'run tests',
  file: path.join(__dirname, 'test.js'),
  function: 'test'
})

export default test
