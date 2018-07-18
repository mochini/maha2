import generator from '../../objects/generator'

const Task = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/tasks/<%= _.snakeCase(name) %>_task.js',
      template: 'task.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/tasks/<%= _.snakeCase(name) %>_task_test.js',
      template: 'test.ejs'
    }
  ]
})

export default Task
