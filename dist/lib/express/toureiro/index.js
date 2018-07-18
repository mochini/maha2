'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toureiro = require('toureiro');

var _toureiro2 = _interopRequireDefault(_toureiro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env$REDIS_UR = process.env.REDIS_URL.match(/redis\:\/\/([\d\w\.]*)\:(\d*)\/(\d*)/),
    _process$env$REDIS_UR2 = (0, _slicedToArray3.default)(_process$env$REDIS_UR, 4),
    host = _process$env$REDIS_UR2[1],
    port = _process$env$REDIS_UR2[2],
    db = _process$env$REDIS_UR2[3];

var toureiroMiddleware = (0, _toureiro2.default)({ redis: { port: port, host: host, db: db } });

exports.default = toureiroMiddleware;