'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _console = require('./console');

var _child_process = require('child_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var root = _path2.default.resolve();

var sectionPaths = ['apps'];

var serverWatch = function serverWatch(entity, command) {

  var proc = (0, _child_process.spawn)('nodemon', [_path2.default.join(__dirname, '..', 'bin', 'maha.js')].concat(_toConsumableArray(_lodash2.default.castArray(command)), ['--quiet'], _toConsumableArray(sectionPaths.reduce(function (items, section) {
    return [].concat(_toConsumableArray(items), _toConsumableArray(_fs2.default.readdirSync(_path2.default.join(root, section)).reduce(function (items, item) {
      if (!_fs2.default.existsSync(_path2.default.join(root, section, item))) return items;
      return [].concat(_toConsumableArray(items), ['--watch', _path2.default.join(root, section, item)]);
    }, [])));
  }, [])), ['--exec', 'babel-node', '--color']), {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  });

  proc.on('message', function (event) {

    if (event.type === 'start') {

      (0, _console.info)(entity, 'Finished compiling server');
    } else if (event.type === 'restart') {

      (0, _console.info)(entity, 'Detected change in ' + event.data[0].replace(root + '/', ''));
    }
  });

  proc.stdout.on('data', function (data) {

    (0, _console.write)(data.toString());
  });

  proc.stderr.on('data', function (err) {

    (0, _console.error)(entity, '' + err);
  });
};

var _default = serverWatch;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(root, 'root', 'unknown');
  reactHotLoader.register(sectionPaths, 'sectionPaths', 'unknown');
  reactHotLoader.register(serverWatch, 'serverWatch', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;