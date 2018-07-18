import generator from '../../objects/generator'

const Queue = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/queues/<%= _.snakeCase(name) %>_queue.js',
      template: 'queue.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/queues/<%= _.snakeCase(name) %>_queue_test.js',
      template: 'test.ejs'
    }
  ]
})



export default Queue
