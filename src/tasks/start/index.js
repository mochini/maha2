import task from '../../objects/task'
import path from 'path'

const start = task({
  command: 'start',
  description: 'start entities',
  args: [
    { name: 'entity', description: 'name of entity' }
  ],
  file: path.join(__dirname, 'start.js'),
  function: 'start',
  exit: false
})

export default start
