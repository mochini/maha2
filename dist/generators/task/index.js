'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generator = require('../../objects/generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Task = (0, _generator2.default)({
  files: [{
    action: 'create',
    filepath: 'tasks/<%= _.snakeCase(name) %>_task/index.js',
    template: 'task.ejs'
  }, {
    action: 'create',
    filepath: 'tests/tasks/<%= _.snakeCase(name) %>_task_test.js',
    template: 'test.ejs'
  }]
});

exports.default = Task;