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
    filepath: 'admin/components/<%= path %>.js',
    template: 'component.ejs'
  }, {
    action: 'create',
    filepath: 'tests/admin_components/<%= _.snakeCase(path) %>.js',
    template: 'test.ejs'
  }]
});

exports.default = Component;