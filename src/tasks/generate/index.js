import task from '../../objects/task'
import path from 'path'

const generate = [

  task({
    command: 'generate',
    alias: 'g',
    description: 'generate files',
    args: [
      { name: 'template', description: 'name of generator template' },
      { name: 'app', description: 'name of app' },
      { name: 'name', description: 'name of item to be generated' }
    ],
    flags: [
      { name: 'foo', description: 'name of foo' },
      { name: 'bar', description: 'name of bar' },
      { name: 'baz', description: 'name of baz' }
    ],
    file: path.join(__dirname, 'generate.js'),
    function: 'generate'
  }),

  task({
    command: 'destroy',
    alias: 'd',
    description: 'destroy files',
    file: path.join(__dirname, 'generate.js'),
    function: 'destroy'
  })

]

export default generate
