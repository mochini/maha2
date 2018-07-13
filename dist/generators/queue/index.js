'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generator = require('../../objects/generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Queue = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'queues/<%= _.snakeCase(name) %>_queue.js',
    template: 'queue.ejs'
  }, {
    action: 'create',
    filepath: 'tests/queues/<%= _.snakeCase(name) %>_queue_test.js',
    template: 'test.ejs'
  }]
});

exports.default = Queue;