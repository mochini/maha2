import generator from '../../objects/generator'

const Serializer = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/serializers/<%= _.snakeCase(pluralize.singular(name)) %>_serializer.js',
      template: 'serializer.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/serializers/<%= _.snakeCase(pluralize.singular(name)) %>_serializer_test.js',
      template: 'test.ejs'
    }
  ]
})

export default Serializer
