import generator from '../../objects/generator'

const Component = generator({
  files: [
    {
      action: 'create',
      filepath: 'admin/components/<%= path %>/actions.js',
      template: 'actions.ejs'
    }, {
      action: 'create',
      filepath: 'admin/components/<%= path %>/index.js',
      template: 'index.ejs'
    }, {
      action: 'create',
      filepath: 'admin/components/<%= path %>/reducer.js',
      template: 'reducer.ejs'
    }, {
      action: 'create',
      filepath: 'admin/components/<%= path %>/<%= _.snakeCase(name) %>.js',
      template: 'component.ejs'
    }, {
      action: 'create',
      filepath: 'admin/components/<%= path %>/selectors.js',
      template: 'selectors.ejs'
    }, {
      action: 'create',
      filepath: 'admin/components/<%= path %>/style.less',
      template: 'style.ejs'
    }, {
      action: 'create',
      filepath: 'tests/admin_components/<%= _.snakeCase(path) %>.js',
      template: 'test.ejs'
    }
  ]
})



export default Component
