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
      filepath: '<%= name %>/.gitignore',
      template: 'gitignore.ejs'
    }, {
      action: 'create',
      filepath: '<%= name %>/config/deploy.js',
      template: 'deploy.ejs'
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
