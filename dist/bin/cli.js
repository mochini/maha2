#!/usr/bin/env babel-node
'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _collect_objects = require('../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _console = require('../utils/console');

var _babelRegister = require('babel-register');

var _babelRegister2 = _interopRequireDefault(_babelRegister);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _babelRegister2.default)({
  presets: ["es2015", "react", "stage-0"],
  plugins: ["transform-promise-to-bluebird", ["transform-runtime", { "polyfill": false }]]
});
var getTask = function getTask(command) {

  var taskRoot = _path2.default.resolve(__dirname, '..', 'tasks');

  var taskFiles = _fs2.default.readdirSync(taskRoot);

  var tasks = taskFiles.reduce(function (tasks, taskFile) {

    var namespaced = require(_path2.default.join(taskRoot, taskFile)).default;

    return [].concat((0, _toConsumableArray3.default)(tasks), (0, _toConsumableArray3.default)(_lodash2.default.castArray(namespaced)));
  }, []);

  var named = _lodash2.default.find(tasks, { command: command });

  if (named) return named;

  var aliased = _lodash2.default.find(tasks, { alias: command });

  if (aliased) return aliased;

  return null;
};

var argv = (0, _minimist2.default)(process.argv.slice(2));

var task = getTask(argv._[0]);

if (!task) throw new Error('invalid script');

task.action.apply(task, (0, _toConsumableArray3.default)(argv._.slice(1)));