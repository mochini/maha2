'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializer = require('../objects/serializer');

var _serializer2 = _interopRequireDefault(_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var importItemSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id')

  };
});

var _default = importItemSerializer;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(importItemSerializer, 'importItemSerializer', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;