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
