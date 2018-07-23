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
  }],
  after: [{
    description: 'installing node modules',
    command: 'npm install'
  }]
});

exports.default = App;