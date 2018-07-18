import generator from '../../objects/generator'

const App = generator({
  files: [
    {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/api/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/ui/components/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/ui/views/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/api.js',
      template: 'api.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/navigation.js',
      template: 'navigation.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/rights.js',
      template: 'rights.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/routes.js',
      template: 'routes.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/search.js',
      template: 'search.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/admin/style.less',
      template: 'style.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/cron/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/db/fixtures/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/db/migrations/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/db/seeds/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/emails/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/models/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/mailboxes/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/api/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/ui/index.js',
      template: 'index.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/ui/index.html',
      template: 'index.html.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/ui/index.less',
      template: 'index.less.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/ui/reducers.js',
      template: 'reducers.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/ui/app.js',
      template: 'app.js.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/ui/components/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/ui/views/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/ui/views/home.js',
      template: 'home.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/public/ui/views/not_found.js',
      template: 'not_found.ejs'
    }, {
      action: 'copy',
      src: 'public',
      dest: 'apps/<%= app %>/public/public'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/queues/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/serializers/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tasks/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/admin/api/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/admin/ui/components/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/admin/ui/views/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/cron/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/email/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/models/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/mailboxes/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/public/api/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/public/ui/components/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/public/ui/views/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/queues/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/serializers/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/tests/tasks/.gitkeep',
      template: 'gitkeep.ejs'
    }, {
      action: 'create',
      filepath: 'apps/<%= app %>/app.js',
      template: 'app.ejs'
    }
  ]
})

export default App
