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