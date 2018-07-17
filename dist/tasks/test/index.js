'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('../../objects/task');

var _task2 = _interopRequireDefault(_task);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = [(0, _task2.default)({
  command: 'test:watch',
  alias: 'test',
  description: 'run test interactively',
  file: _path2.default.join(__dirname, 'test.js'),
  function: 'run',
  exit: false
}), (0, _task2.default)({
  command: 'test:run',
  description: 'run tests',
  file: _path2.default.join(__dirname, 'test.js'),
  function: 'test'
})];

exports.default = test;