'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generator = require('../../objects/generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Migration = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'db/migrations/<%= moment().format(\'YYYYMMDDHHmmss\') %>_<%= _.snakeCase(name) %>.js',
    template: 'migration.ejs'
  }]
});

exports.default = Migration;