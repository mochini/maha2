'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('../../objects/task');

var _task2 = _interopRequireDefault(_task);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shipit = (0, _task2.default)({
  command: 'shipit',
  description: 'ship code',
  file: _path2.default.join(__dirname, 'shipit.js'),
  function: 'shipit'
});

exports.default = shipit;