'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dev = undefined;

var _console = require('../../utils/console');

var _watch = require('../../utils/watch');

var _watch2 = _interopRequireDefault(_watch);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('./webpack.config');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require('webpack');

var _webpack4 = _interopRequireDefault(_webpack3);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clientWatch = function clientWatch(name, base, port) {

  var compiler = (0, _webpack4.default)((0, _webpack2.default)(name, base, port));

  var devserver = new _webpackDevServer2.default(compiler, {
    contentBase: _path2.default.join(base, 'public'),
    compress: true,
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /.*/, to: 'index.html' }]
    },
    host: '0.0.0.0',
    hot: true,
    open: true,
    // proxy: {
    //   '*': 'http://localhost:3001'
    // },
    stats: 'errors-only',
    watchContentBase: true
  });

  devserver.listen(port, '0.0.0.0', function () {
    (0, _console.info)(name, 'Listening on ' + port);
  });
};

var dev = exports.dev = function dev(flags, args) {

  (0, _watch2.default)('maha', 'start');

  clientWatch('admin', _path2.default.resolve('node_modules', 'maha', 'src', 'admin'), 4000);

  _fs2.default.readdirSync(_path2.default.join('apps')).filter(function (app) {

    return _fs2.default.lstatSync(_path2.default.join('apps', app)).isDirectory();
  }).map(function (app, index) {

    clientWatch(app, _path2.default.resolve('apps', app, 'public'), 4001 + index);
  });
};