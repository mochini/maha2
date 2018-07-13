import generator from '../../objects/generator'

const App = generator({
  files: [
    {
      action: 'create',
      filepath: '.gitignore',
      template: 'gitignore.ejs'
    }, {
      action: 'create',
      filepath: 'packages/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'db/migrations/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'db/seeds/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'tasks/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'cron.js',
      template: 'cron.ejs'
    }, {
      action: 'create',
      filepath: 'server.js',
      template: 'server.ejs'
    }, {
      action: 'create',
      filepath: 'socket.js',
      template: 'socket.ejs'
    }, {
      action: 'create',
      filepath: 'worker.js',
      template: 'worker.ejs'
    }, {
      action: 'create',
      filepath: 'tmp/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: '.babelrc',
      template: 'babelrc.ejs'
    }, {
      action: 'create',
      filepath: 'package.json',
      template: 'package.ejs'
    }, {
      action: 'create',
      filepath: 'README.md',
      template: 'readme.ejs'
    }
  ],
  after: [
    {
      description: 'installing node modules',
      command: 'npm install'
    }, {
      description: 'building source',
      command: 'npm run build'
    }
  ]
})



export default App
