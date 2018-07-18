import generator from '../../objects/generator'

const Queue = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/mailboxes/<%= _.snakeCase(name) %>_mailbox/index.js',
      template: 'mailbox.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/mailboxes/<%= _.snakeCase(name) %>_mailbox_test.js',
      template: 'test.ejs'
    }
  ]
})



export default Queue
