import task from '../../objects/task'
import path from 'path'

const build = [

  task({
    command: 'db:migrate:up',
    description: 'run up migrations',
    file: path.join(__dirname, 'db.js'),
    function: 'migrateUp'
  }),

  task({
    command: 'db:migrate:down',
    description: 'run down migrations',
    file: path.join(__dirname, 'db.js'),
    function: 'migrateDown'
  })

]

export default build
