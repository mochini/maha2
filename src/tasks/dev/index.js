import task from '../../objects/task'
import path from 'path'

const build = task({
  command: 'dev',
  description: 'start dev server',
  file: path.join(__dirname, 'dev.js'),
  function: 'dev',
  exit: false
})

export default build
