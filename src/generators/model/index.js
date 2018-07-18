import generator from '../../objects/generator'

const Model = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/db/migrations/<%= moment().format(\'YYYYMMDDHHmmss\') %>_<%= _.snakeCase(pluralize(name)) %>.js',
      template: 'migration.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/db/fixtures/<%= _.snakeCase(pluralize(name)) %>.js',
      template: 'fixtures.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/models/<%= _.snakeCase(pluralize.singular(name)) %>.js',
      template: 'model.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/serializers/<%= _.snakeCase(pluralize.singular(name)) %>_serializer.js',
      template: 'serializer.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/models/<%= _.snakeCase(pluralize.singular(name)) %>_test.js',
      template: 'model_test.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/serializers/<%= _.snakeCase(pluralize.singular(name)) %>_serializer_test.js',
      template: 'serializer_test.ejs'
    }
  ]
})

export default Model
