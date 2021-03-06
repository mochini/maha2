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

var reviewSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    uid: result.get('uid'),

    user: {

      id: result.related('user').get('id'),

      full_name: result.related('user').get('full_name'),

      initials: result.related('user').get('initials'),

      photo: result.related('user').related('photo').get('path')

    },

    score: result.get('score'),

    text: result.get('text'),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

var _default = reviewSerializer;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(reviewSerializer, 'reviewSerializer', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;