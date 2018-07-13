'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('../../objects/task');

var _task2 = _interopRequireDefault(_task);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = (0, _task2.default)({
  command: 'start',
  description: 'start servers',
  file: _path2.default.join(__dirname, 'start.js'),
  function: 'start',
  exit: false
});

exports.default = start;