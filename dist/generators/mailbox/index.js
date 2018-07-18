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
    filepath: 'apps/<%= app %>/mailboxes/<%= _.snakeCase(name) %>_mailbox/index.js',
    template: 'mailbox.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/tests/mailboxes/<%= _.snakeCase(name) %>_mailbox_test.js',
    template: 'test.ejs'
  }]
});

exports.default = Queue;