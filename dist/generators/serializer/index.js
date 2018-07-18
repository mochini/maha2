'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generator = require('../../objects/generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Serializer = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'apps/<%= app %>/serializers/<%= _.snakeCase(pluralize.singular(name)) %>_serializer.js',
    template: 'serializer.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/tests/serializers/<%= _.snakeCase(pluralize.singular(name)) %>_serializer_test.js',
    template: 'test.ejs'
  }]
});

exports.default = Serializer;