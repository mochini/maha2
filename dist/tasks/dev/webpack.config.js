'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uiRoot = _path2.default.resolve(__dirname, '..', '..', 'admin', 'ui'); // import MahaScriptPlugin from '../../lib/webpack/maha_script_plugin'
// import MahaStylePlugin from '../../lib/webpack/maha_style_plugin'


var config = {
  devtool: 'source-map',
  entry: ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', _path2.default.join(uiRoot, 'admin.js'), _path2.default.join(uiRoot, 'admin.less')],
  module: {
    rules: [{
      test: /\.less$/,
      exclude: /node_modules/,
      loader: ['style-loader', 'css-loader?url=false', 'postcss-loader', 'less-loader']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        plugins: ['react-hot-loader/babel']
      }
    }]
  },
  mode: 'development',
  output: {
    filename: 'application.js'
  },
  plugins: [
  // new MahaScriptPlugin(),
  // new MahaStylePlugin(),
  new _webpack2.default.HotModuleReplacementPlugin(), new _htmlWebpackPlugin2.default({
    title: 'MAHA Platform',
    template: _path2.default.join(uiRoot, 'index.html')
  }), new _webpack2.default.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'DOMAIN': JSON.stringify(process.env.DOMAIN || 'localhost'),
      'SOCKET_PORT': JSON.stringify(process.env.SOCKET_PORT || '8090'),
      'VAPID_PUBLIC_KEY': JSON.stringify(process.env.VAPID_PUBLIC_KEY),
      'WEB_HOST': JSON.stringify(process.env.WEB_HOST),
      'WEB_ASSET_CDN_HOST': JSON.stringify(process.env.WEB_ASSET_CDN_HOST),
      'DATA_ASSET_CDN_HOST': JSON.stringify(process.env.DATA_ASSET_CDN_HOST),
      'WEB_ASSET_HOST': JSON.stringify(process.env.WEB_ASSET_HOST),
      'DATA_ASSET_HOST': JSON.stringify(process.env.DATA_ASSET_HOST),
      'ROLLBAR_CLIENT_TOKEN': JSON.stringify(process.env.ROLLBAR_CLIENT_TOKEN)
    }
  })]
};

exports.default = config;