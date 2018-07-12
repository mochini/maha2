'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _platform = require('./platform');

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var admin = function admin(features) {

  var element = document.getElementById('platform');

  _reactDom2.default.render(_react2.default.createElement(_platform2.default, features), element);
}; // import 'babel-polyfill'
exports.default = admin;