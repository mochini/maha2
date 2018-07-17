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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeBuilt = function removeBuilt() {
  return _rimraf2.default.sync(_path2.default.join('build'));
};

var clientWatch = function clientWatch(base, port) {

  var devserver = new _webpackDevServer2.default((0, _webpack4.default)((0, _webpack2.default)(base, port)), {
    contentBase: _path2.default.join(base, 'public'),
    compress: true,
    hot: true,
    proxy: {
      '*': 'http://localhost:3001'
    },
    stats: 'errors-only',
    watchContentBase: true,
    open: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /.*/, to: "index.html" }]
    }
  });

  devserver.listen(port, function () {
    console.info('Listening on ' + port);
  });
};

var dev = exports.dev = function dev() {

  (0, _watch2.default)('maha', 'start');

  clientWatch(_path2.default.resolve('node_modules', 'maha', 'src', 'admin'), 3000);

  _fs2.default.readdirSync(_path2.default.join('apps')).map(function (app, index) {

    clientWatch(_path2.default.resolve('apps', app, 'public'), 4000 + index);
  });
};