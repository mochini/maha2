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
  args: [{ name: 'template', description: 'name of generator template' }, { name: 'app', description: 'name of app' }, { name: 'name', description: 'name of item to be generated' }],
  flags: [{ name: 'foo', description: 'name of foo' }, { name: 'bar', description: 'name of bar' }, { name: 'baz', description: 'name of baz' }],
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