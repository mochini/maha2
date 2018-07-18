import generator from '../../objects/generator'

const Migration = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/emails/<%= _.snakeCase(name) %>_email/index.js',
      template: 'email.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/emails/<%= _.snakeCase(name) %>_email/html.ejs'
    }
  ]
})

export default Migration
