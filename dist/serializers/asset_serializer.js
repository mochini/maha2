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

var assetSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    original_file_name: result.get('original_file_name'),

    file_name: result.get('file_name'),

    content_type: result.get('content_type'),

    file_size: result.get('file_size'),

    chunks_total: result.get('chunks_total'),

    resized_url: result.get('resized_url'),

    path: result.get('path'),

    url: result.get('url'),

    source: result.related('source').get('text'),

    source_url: result.get('source_url'),

    user: user(result.related('user')),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

var user = function user(_user, key) {

  if (!_user.id) return null;

  return {

    id: _user.get('id'),

    full_name: _user.get('full_name'),

    initials: _user.get('initials'),

    photo: _user.related('photo') ? _user.related('photo').get('path') : null

  };
};

var _default = assetSerializer;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(assetSerializer, 'assetSerializer', 'unknown');
  reactHotLoader.register(user, 'user', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;