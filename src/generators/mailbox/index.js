import generator from '../../objects/generator'

const Queue = generator({
  files: [
    {
      action: 'create',
      filepath: 'mailboxes/<%= _.snakeCase(name) %>_mailbox/index.js',
      template: 'mailbox.ejs'
    }, {
      action: 'create',
      filepath: 'tests/mailboxes/<%= _.snakeCase(name) %>_mailbox_test.js',
      template: 'test.ejs'
    }
  ]
})



export default Queue
