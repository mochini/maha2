'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _backframe = require('../lib/backframe');

var _backframe2 = _interopRequireDefault(_backframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = function Route(options) {
  (0, _classCallCheck3.default)(this, Route);


  return _backframe2.default.route(options);
};

exports.default = Route;