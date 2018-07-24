"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var serializer = function serializer(options) {

  return options;
};

var _default = serializer;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(serializer, "serializer", "unknown");
  reactHotLoader.register(_default, "default", "unknown");
  leaveModule(module);
})();

;