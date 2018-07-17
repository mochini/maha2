'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _console = require('./console');

var _child_process = require('child_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = _path2.default.resolve();

var sectionPaths = ['apps'];

var serverWatch = function serverWatch(entity, command) {

  var proc = (0, _child_process.spawn)('nodemon', [_path2.default.join(__dirname, '..', 'bin', 'cli.js')].concat((0, _toConsumableArray3.default)(_lodash2.default.castArray(command)), ['--quiet'], (0, _toConsumableArray3.default)(sectionPaths.reduce(function (items, section) {
    return [].concat((0, _toConsumableArray3.default)(items), (0, _toConsumableArray3.default)(_fs2.default.readdirSync(_path2.default.join(root, section)).reduce(function (items, item) {
      if (!_fs2.default.existsSync(_path2.default.join(root, section, item))) return items;
      return [].concat((0, _toConsumableArray3.default)(items), ['--watch', _path2.default.join(root, section, item)]);
    }, [])));
  }, [])), ['--exec', 'babel-node', '--color']), {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  });

  proc.on('message', function (event) {
    if (event.type === 'start') {
      (0, _console.info)(entity, 'Compiled successfully');
    } else if (event.type === 'restart') {
      (0, _console.info)(entity, 'Detected change in ' + event.data[0].replace(root + '/', ''));
    }
  });

  proc.stdout.on('data', function (data) {
    process.stdout.write(data.toString());
  });

  proc.stderr.on('data', function (err) {
    (0, _console.error)(entity, '' + err);
  });
};

exports.default = serverWatch;