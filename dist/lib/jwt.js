'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = exports.encode = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encode = exports.encode = function encode(data, duration) {

  var iat = Math.floor(Date.now() / 1000);

  var exp = iat + duration;

  return _jsonwebtoken2.default.sign({ iat: iat, exp: exp, data: data }, process.env.SECRET);
};

var decode = exports.decode = function decode(token) {

  return _jsonwebtoken2.default.verify(token, process.env.SECRET);
};