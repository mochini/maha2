'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha_compiler_plugin = require('../../lib/webpack/maha_compiler_plugin');

var _maha_compiler_plugin2 = _interopRequireDefault(_maha_compiler_plugin);

var _miniCssExtractPlugin = require('mini-css-extract-plugin');

var _miniCssExtractPlugin2 = _interopRequireDefault(_miniCssExtractPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _cssnano = require('cssnano');

var _cssnano2 = _interopRequireDefault(_cssnano);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = function config(name, base) {
  return {
    entry: [_path2.default.join(base, 'ui', 'index.js'), _path2.default.join(base, 'ui', 'index.less')],
    module: {
      rules: [{
        test: /\.less$/,
        exclude: /node_modules/,
        use: [_miniCssExtractPlugin2.default.loader, 'css-loader?url=false', {
          loader: 'postcss-loader',
          options: {
            plugins: [_autoprefixer2.default, _cssnano2.default]
          }
        }, 'less-loader']
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      }]
    },
    mode: 'production',
    output: {
      path: _path2.default.resolve('build', 'public', name),
      filename: _path2.default.join('js', 'bundle-[hash].min.js'),
      publicPath: ''
    },
    plugins: [new _maha_compiler_plugin2.default(name), new _miniCssExtractPlugin2.default({
      path: _path2.default.resolve('build', 'public', name),
      filename: _path2.default.join('css', 'bundle-[hash].min.css'),
      publicPath: ''
    }), new _htmlWebpackPlugin2.default({
      path: _path2.default.resolve('build', 'public', name),
      template: _path2.default.join(base, 'ui', 'index.html'),
      publicPath: ''
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
    })],
    resolve: {
      alias: {
        apps: _path2.default.resolve('apps'),
        packages: _path2.default.resolve('packages')
      }
    }
  };
};

exports.default = config;