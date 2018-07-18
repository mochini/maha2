'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generator = require('../../objects/generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'admin/api/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'admin/ui/components/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'admin/ui/views/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'admin/api.js',
    template: 'api.ejs'
  }, {
    action: 'create',
    filepath: 'admin/navigation.js',
    template: 'navigation.ejs'
  }, {
    action: 'create',
    filepath: 'admin/rights.js',
    template: 'rights.ejs'
  }, {
    action: 'create',
    filepath: 'admin/routes.js',
    template: 'routes.ejs'
  }, {
    action: 'create',
    filepath: 'admin/search.js',
    template: 'search.ejs'
  }, {
    action: 'create',
    filepath: 'admin/style.less',
    template: 'style.ejs'
  }, {
    action: 'create',
    filepath: 'cron/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'db/fixtures/.gitkeep',
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
    filepath: 'emails/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'models/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'mailboxes/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'public/api/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'public/ui/index.js',
    template: 'index.ejs'
  }, {
    action: 'create',
    filepath: 'public/ui/index.html',
    template: 'index.html.ejs'
  }, {
    action: 'create',
    filepath: 'public/ui/index.less',
    template: 'index.less.ejs'
  }, {
    action: 'create',
    filepath: 'public/ui/reducers.js',
    template: 'reducers.ejs'
  }, {
    action: 'create',
    filepath: 'public/ui/app.js',
    template: 'app.js.ejs'
  }, {
    action: 'create',
    filepath: 'public/ui/components/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'public/ui/views/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'public/ui/views/home.js',
    template: 'home.ejs'
  }, {
    action: 'create',
    filepath: 'public/ui/views/not_found.js',
    template: 'not_found.ejs'
  }, {
    action: 'copy',
    src: 'public',
    dest: 'public/public'
  }, {
    action: 'create',
    filepath: 'queues/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'serializers/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tasks/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/admin/api/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/admin/ui/components/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/admin/ui/views/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/cron/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/email/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/models/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/mailboxes/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/public/api/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/public/ui/components/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/public/ui/views/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/queues/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/serializers/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'tests/tasks/.gitkeep',
    template: 'gitkeep.ejs'
  }, {
    action: 'create',
    filepath: 'app.js',
    template: 'app.ejs'
  }],
  after: [{
    description: 'installing node modules',
    command: 'npm install'
  }, {
    description: 'building source',
    command: 'npm run build'
  }]
});

exports.default = App;