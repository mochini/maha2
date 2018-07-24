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

var Model = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'apps/<%= app %>/db/migrations/<%= moment().format(\'YYYYMMDDHHmmss\') %>_create_<%= _.snakeCase(pluralize(name)) %>.js',
    template: 'migration.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/db/fixtures/<%= _.snakeCase(pluralize(name)) %>.js',
    template: 'fixtures.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/models/<%= _.snakeCase(pluralize.singular(name)) %>.js',
    template: 'model.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/serializers/<%= _.snakeCase(pluralize.singular(name)) %>_serializer.js',
    template: 'serializer.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/tests/models/<%= _.snakeCase(pluralize.singular(name)) %>_test.js',
    template: 'model_test.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/tests/serializers/<%= _.snakeCase(pluralize.singular(name)) %>_serializer_test.js',
    template: 'serializer_test.ejs'
  }]
});

var _default = Model;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Model, 'Model', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;