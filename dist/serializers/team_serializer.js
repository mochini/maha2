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

var teamSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    title: result.get('title'),

    subdomain: result.get('subdomain'),

    color: result.get('color'),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

var _default = teamSerializer;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(teamSerializer, 'teamSerializer', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;