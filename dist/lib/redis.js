'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./environment');

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _redis2.default.createClient(process.env.REDIS_URL);