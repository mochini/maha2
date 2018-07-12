'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _console = require('../../utils/console');

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _child_process = require('child_process');

var _webpack = require('./webpack.config');

var _webpack2 = _interopRequireDefault(_webpack);

var _nodemon = require('nodemon');

var _nodemon2 = _interopRequireDefault(_nodemon);

var _webpack3 = require('webpack');

var _webpack4 = _interopRequireDefault(_webpack3);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import '../../lib/environment'
var root = _path2.default.resolve();

var watchPaths = ['apps', 'packages', 'plugins'];

var removeBuilt = function removeBuilt() {
  return _rimraf2.default.sync(_path2.default.join('build'));
};

var serverWatch = function serverWatch(entity, watch) {

  var proc = (0, _child_process.spawn)('nodemon', [_path2.default.join(__dirname, '..', '..', 'bin', 'cli.js'), 'start', entity, '--quiet'].concat((0, _toConsumableArray3.default)(watchPaths.reduce(function (items, group) {
    return [].concat((0, _toConsumableArray3.default)(items), (0, _toConsumableArray3.default)(_fs2.default.readdirSync(_path2.default.join(root, group)).reduce(function (items, item) {
      if (!_fs2.default.existsSync(_path2.default.join(root, group, item, watch))) return items;
      return [].concat((0, _toConsumableArray3.default)(items), ['--watch', _path2.default.join(root, group, item, watch)]);
    }, [])));
  }, [])), ['--exec', 'babel-node']), {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  });

  proc.on('message', function (event) {
    if (event.type === 'start') {
      (0, _console.info)(entity, 'Compiled successfully.');
    } else if (event.type === 'restart') {
      (0, _console.info)(entity, 'Detected change in ' + event.data[0].replace(root + '/', ''));
    }
  });

  proc.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  proc.stderr.on('data', function (err) {
    (0, _console.error)(entity, '' + err);
  });
};

var clientWatch = function clientWatch() {

  var devserver = new _webpackDevServer2.default((0, _webpack4.default)(_webpack2.default), {
    contentBase: _path2.default.join('public'),
    compress: true,
    hot: true,
    proxy: {
      '*': 'http://localhost:3001'
    },
    stats: 'errors-only',
    watchContentBase: true,
    open: true
  });

  devserver.use('/admin', _express2.default.static(_path2.default.join(root, 'packages', 'maha', 'src', 'admin', 'public'), { redirect: false }));

  devserver.listen(3000, function () {
    console.info('listening on 3000');
  });
};

var dev = function dev() {

  serverWatch('server', _path2.default.join('admin', 'api'));

  serverWatch('socket', _path2.default.join('admin', 'api'));

  serverWatch('cron', _path2.default.join('cron'));

  serverWatch('worker', _path2.default.join('queues'));

  clientWatch();
};

exports.default = dev;