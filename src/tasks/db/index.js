import task from '../../objects/task'
import path from 'path'

const build = [

  task({
    command: 'db:create',
    description: 'create database',
    file: path.join(__dirname, 'database.js'),
    function: 'create'
  }),

  task({
    command: 'db:drop',
    description: 'drop database',
    file: path.join(__dirname, 'database.js'),
    function: 'drop'
  }),

  task({
    command: 'db:migrate:up',
    description: 'run up migrations',
    file: path.join(__dirname, 'migrate.js'),
    function: 'migrateUp'
  }),

  task({
    command: 'db:migrate:down',
    description: 'run down migrations',
    file: path.join(__dirname, 'migrate.js'),
    function: 'migrateDown'
  }),

  task({
    command: 'db:migrate:redo',
    description: 'run down migrations',
    file: path.join(__dirname, 'migrate.js'),
    function: 'migrateRedo'
  }),

  task({
    command: 'db:schema:dump',
    description: 'dump schema',
    file: path.join(__dirname, 'schema.js'),
    function: 'dump'
  }),

  task({
    command: 'db:schema:load',
    description: 'load Schema',
    file: path.join(__dirname, 'schema.js'),
    function: 'load'
  })

]

export default build
