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

var importSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    asset: asset(result.related('asset')),

    stage: result.get('stage'),

    delimiter: result.get('delimiter'),

    headers: result.get('headers'),

    mapping: result.get('mapping'),

    user: user(result.related('user')),

    name: result.get('name'),

    object_type: result.get('object_type'),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

var user = function user(_user) {

  if (!_user.id) return null;

  return {

    id: _user.get('id'),

    full_name: _user.get('full_name'),

    initials: _user.get('initials'),

    photo: _user.related('photo').get('path')

  };
};

var asset = function asset(_asset) {

  if (!_asset.id) return null;

  return {

    id: _asset.get('id'),

    content_type: _asset.get('content_type'),

    original_file_name: _asset.get('file_name'),

    file_name: _asset.get('file_name'),

    file_size: _asset.get('file_size'),

    icon: _asset.get('icon'),

    path: _asset.get('path'),

    source: _asset.related('source').get('text'),

    source_url: _asset.get('source_url')

  };
};

var _default = importSerializer;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(importSerializer, 'importSerializer', 'unknown');
  reactHotLoader.register(user, 'user', 'unknown');
  reactHotLoader.register(asset, 'asset', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;