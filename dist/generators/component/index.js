'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generator = require('../../objects/generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'apps/<%= app %>/admin/ui/components/<%= _.snakeCase(path) %>.js',
    template: 'component.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/tests/admin/ui/components/<%= _.snakeCase(path) %>_test.js',
    template: 'test.ejs'
  }]
});

exports.default = Component;