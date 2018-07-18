import generator from '../../objects/generator'

const Migration = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/db/migrations/<%= moment().format(\'YYYYMMDDHHmmss\') %>_<%= _.snakeCase(name) %>.js',
      template: 'migration.ejs'
    }
  ]

})

export default Migration
