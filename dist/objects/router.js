'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backframe = require('../lib/backframe');

var _backframe2 = _interopRequireDefault(_backframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var router = function router(options) {

  return _backframe2.default.router(options);
};

var _default = router;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, 'router', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;