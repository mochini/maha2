'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _console = require('../utils/console');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var socket = function socket() {

  (0, _console.info)('socket', 'Starting socket');
};

var _default = socket;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(socket, 'socket', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;