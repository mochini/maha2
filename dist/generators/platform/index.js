'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generator = require('../../objects/generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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
  }],
  after: [{
    description: 'installing node modules',
    command: 'npm install'
  }]
});

var _default = App;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, 'App', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;