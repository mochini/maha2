'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('../../objects/task');

var _task2 = _interopRequireDefault(_task);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var build = [(0, _task2.default)({
  command: 'db:migrate:up',
  description: 'run up migrations',
  file: _path2.default.join(__dirname, 'db.js'),
  function: 'migrateUp'
}), (0, _task2.default)({
  command: 'db:migrate:down',
  description: 'run down migrations',
  file: _path2.default.join(__dirname, 'db.js'),
  function: 'migrateDown'
})];

exports.default = build;