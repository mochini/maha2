import generator from '../../objects/generator'

const Component = generator({
  files: [
    {
      action: 'create',
      filepath: 'admin/components/<%= path %>.js',
      template: 'component.ejs'
    }, {
      action: 'create',
      filepath: 'tests/admin_components/<%= _.snakeCase(path) %>.js',
      template: 'test.ejs'
    }
  ]
})



export default Component
