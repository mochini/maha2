import generator from '../../objects/generator'

const Component = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/actions.js',
      template: 'actions.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/index.js',
      template: 'index.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/reducer.js',
      template: 'reducer.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/<%= _.snakeCase(name) %>.js',
      template: 'component.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/selectors.js',
      template: 'selectors.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/style.less',
      template: 'style.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/admin/ui/components/<%= _.snakeCase(path) %>_test.js',
      template: 'test.ejs'
    }
  ]
})



export default Component
