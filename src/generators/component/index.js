import generator from '../../objects/generator'

const Component = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/ui/components/<%= _.snakeCase(path) %>.js',
      template: 'component.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/admin/ui/components/<%= _.snakeCase(path) %>_test.js',
      template: 'test.ejs'
    }
  ]
})



export default Component
