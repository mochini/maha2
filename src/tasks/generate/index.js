import task from '../../objects/task'
import path from 'path'

const generate = [

  task({
    command: 'generate',
    alias: 'g',
    description: 'generate files',
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
