import generator from '../../objects/generator'

const Queue = generator({
  files: [
    {
      action: 'create',
      filepath: 'queues/<%= _.snakeCase(name) %>_queue.js',
      template: 'queue.ejs'
    }, {
      action: 'create',
      filepath: 'tests/queues/<%= _.snakeCase(name) %>_queue_test.js',
      template: 'test.ejs'
    }
  ]
})



export default Queue
