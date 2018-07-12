'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ping = function ping(req, res, next) {

  res.status(200).send('pong');
};

exports.default = ping;