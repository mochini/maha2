import generator from '../../objects/generator'

const Task = generator({
  files: [
    {
      action: 'create',
      filepath: 'tasks/<%= _.snakeCase(name) %>_task.js',
      template: 'task.ejs'
    }, {
      action: 'create',
      filepath: 'tests/tasks/<%= _.snakeCase(name) %>_task_test.js',
      template: 'test.ejs'
    }
  ]
})

export default Task
