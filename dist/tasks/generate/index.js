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

var _default = generate;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(generate, 'generate', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;