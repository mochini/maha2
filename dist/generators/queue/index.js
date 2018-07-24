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

var Queue = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'apps/<%= app %>/queues/<%= _.snakeCase(name) %>_queue.js',
    template: 'queue.ejs'
  }, {
    action: 'create',
    filepath: 'apps/<%= app %>/tests/queues/<%= _.snakeCase(name) %>_queue_test.js',
    template: 'test.ejs'
  }]
});

var _default = Queue;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Queue, 'Queue', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;