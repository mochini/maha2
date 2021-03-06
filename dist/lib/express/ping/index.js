'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var ping = function ping(req, res, next) {

  res.status(200).send('pong');
};

var _default = ping;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ping, 'ping', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;