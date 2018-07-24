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

var Component = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/actions.js',
    template: 'actions.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/index.js',
    template: 'index.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/reducer.js',
    template: 'reducer.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/<%= _.snakeCase(name) %>.js',
    template: 'component.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/selectors.js',
    template: 'selectors.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/admin/ui/components/<%= path %>/style.less',
    template: 'style.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/tests/admin/ui/components/<%= _.snakeCase(path) %>_test.js',
    template: 'test.ejs'
  }]
});

var _default = Component;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Component, 'Component', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;