import task from '../../objects/task'
import path from 'path'

const test = [

  task({
    command: 'test:watch',
    alias: 'test',
    description: 'run test interactively',
    file: path.join(__dirname, 'test.js'),
    function: 'run',
    exit: false
  }),

  task({
    command: 'test:run',
    description: 'run tests',
    file: path.join(__dirname, 'test.js'),
    function: 'test'
  })

]

export default test
