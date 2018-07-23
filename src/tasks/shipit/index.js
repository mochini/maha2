import task from '../../objects/task'
import path from 'path'

const shipit = task({
  command: 'shipit',
  description: 'ship code',
  file: path.join(__dirname, 'shipit.js'),
  args: [
    { name: 'environment', description: 'target environment' },
    { name: 'command', description: 'command to execute' }
  ],
  function: 'shipit'
})

export default shipit
