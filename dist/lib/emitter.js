'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./environment');

var _socket = require('socket.io-emitter');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = (0, _socket2.default)(process.env.REDIS_URL);

exports.default = emitter;