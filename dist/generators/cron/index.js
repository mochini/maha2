'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generator = require('../../objects/generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cron = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'cron/<%= _.snakeCase(name) %>_cron.js',
    template: 'cron.ejs'
  }, {
    action: 'create',
    filepath: 'tests/cron/<%= _.snakeCase(name) %>_cron_test.js',
    template: 'test.ejs'
  }]
});

exports.default = Cron;