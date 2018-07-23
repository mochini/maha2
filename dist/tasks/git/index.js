'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('../../objects/task');

var _task2 = _interopRequireDefault(_task);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var git = (0, _task2.default)({
  command: 'git',
  description: 'manage apps via git',
  args: [{ name: 'action', description: 'git action' }, { name: 'repository', description: 'git repository' }],
  file: _path2.default.join(__dirname, 'git.js'),
  function: 'git'
});

exports.default = git;