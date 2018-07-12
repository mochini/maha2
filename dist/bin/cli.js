#!/usr/bin/env babel-node
'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _babelRegister = require('babel-register');

var _babelRegister2 = _interopRequireDefault(_babelRegister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _babelRegister2.default)({
  presets: ["es2015", "react", "stage-0"],
  plugins: ["transform-promise-to-bluebird", ["transform-runtime", { "polyfill": false }]]
});

var argv = (0, _minimist2.default)(process.argv.slice(2));

var namespace = argv._[0].split(':')[0];

var scriptPath = _path2.default.resolve(__dirname, '..', 'tasks', namespace, namespace + '.js');

if (!_fs2.default.existsSync(scriptPath)) throw new Error('invalid script');

var script = require(scriptPath).default;

script.apply(undefined, (0, _toConsumableArray3.default)(argv._.slice(1)));