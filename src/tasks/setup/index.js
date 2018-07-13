import task from '../../objects/task'
import path from 'path'

const setup = task({
  command: 'setup',
  description: 'setup platform',
  file: path.join(__dirname, 'setup.js'),
  function: 'setup',
  exit: false
})

export default setup
