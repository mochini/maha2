'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('../../objects/task');

var _task2 = _interopRequireDefault(_task);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var build = [(0, _task2.default)({
  command: 'db:create',
  description: 'create database',
  file: _path2.default.join(__dirname, 'database.js'),
  function: 'create'
}), (0, _task2.default)({
  command: 'db:drop',
  description: 'drop database',
  file: _path2.default.join(__dirname, 'database.js'),
  function: 'drop'
}), (0, _task2.default)({
  command: 'db:version',
  description: 'print current schema version',
  file: _path2.default.join(__dirname, 'schema.js'),
  function: 'version'
}), (0, _task2.default)({
  command: 'db:migrate:up',
  description: 'run up migrations',
  file: _path2.default.join(__dirname, 'migrate.js'),
  function: 'migrateUp'
}), (0, _task2.default)({
  command: 'db:migrate:down',
  description: 'run down migrations',
  file: _path2.default.join(__dirname, 'migrate.js'),
  function: 'migrateDown'
}), (0, _task2.default)({
  command: 'db:migrate:redo',
  description: 'run down migrations',
  file: _path2.default.join(__dirname, 'migrate.js'),
  function: 'migrateRedo'
}), (0, _task2.default)({
  command: 'db:schema:dump',
  description: 'dump schema',
  file: _path2.default.join(__dirname, 'schema.js'),
  function: 'dump'
}), (0, _task2.default)({
  command: 'db:schema:load',
  description: 'load schema',
  file: _path2.default.join(__dirname, 'schema.js'),
  function: 'load'
}), (0, _task2.default)({
  command: 'db:fixtures:load',
  description: 'load fixtures',
  file: _path2.default.join(__dirname, 'migrate.js'),
  function: 'fixturesLoad'
}), (0, _task2.default)({
  command: 'db:seeds:load',
  description: 'load seeds',
  file: _path2.default.join(__dirname, 'migrate.js'),
  function: 'seedsLoad'
})];

var _default = build;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(build, 'build', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;