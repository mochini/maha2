import task from '../../objects/task'
import path from 'path'

const shipit = task({
  command: 'shipit',
  description: 'ship code',
  file: path.join(__dirname, 'shipit.js'),
  function: 'shipit',
  exit: false
})

export default shipit
