import generator from '../../objects/generator'

const App = generator({
  files: [
    {
      action: 'create',
      filepath: '<%= name %>/.gitignore',
      template: 'gitignore.ejs'
    }, {
      action: 'create',
      filepath: '<%= name %>/package.json',
      template: 'package.ejs'
    }, {
      action: 'create',
      filepath: '<%= name %>/apps/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: '<%= name %>/config/deploy.js',
      template: 'deploy.ejs'
    }, {
      action: 'create',
      filepath: '<%= name %>/config/ecosystem.config.js',
      template: 'ecosystem.ejs'
    }, {
      action: 'create',
      filepath: '<%= name %>/db/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: '<%= name %>/tmp/.gitkeep',
      template: 'gitkeep.ejs'
    }
  ],
  after: [
    {
      description: 'installing node modules',
      command: 'npm install'
    }
  ]
})



export default App
