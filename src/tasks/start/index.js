import task from '../../objects/task'
import path from 'path'

const start = task({
  command: 'start',
  description: 'start servers',
  file: path.join(__dirname, 'start.js'),
  function: 'start',
  exit: false
})

export default start
