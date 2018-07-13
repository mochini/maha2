'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('../../objects/task');

var _task2 = _interopRequireDefault(_task);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generate = [(0, _task2.default)({
  command: 'generate',
  alias: 'g',
  description: 'generate files',
  file: _path2.default.join(__dirname, 'generate.js'),
  function: 'generate'
}), (0, _task2.default)({
  command: 'destroy',
  alias: 'd',
  description: 'destroy files',
  file: _path2.default.join(__dirname, 'generate.js'),
  function: 'destroy'
})];

exports.default = generate;