'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializer = require('../objects/serializer');

var _serializer2 = _interopRequireDefault(_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    uid: result.get('uid'),

    user: user(result.related('user')),

    attachments: result.related('attachments').map(attachment),

    text: result.get('text'),

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

var attachment = function attachment(_attachment) {

  if (!_attachment.id) return null;

  return {

    id: _attachment.get('id'),

    type: _attachment.get('type'),

    from_url: _attachment.get('from_url'),

    image_bytes: _attachment.get('image_bytes'),

    image_height: _attachment.get('image_height'),

    image_url: _attachment.get('image_url'),

    image_width: _attachment.get('image_width'),

    service_icon: _attachment.related('service').get('icon'),

    service_name: _attachment.related('service').get('name'),

    service_url: _attachment.related('service').get('url'),

    text: _attachment.get('text'),

    title: _attachment.get('title'),

    title_link: _attachment.get('title_link'),

    author_link: _attachment.get('author_link'),

    author_name: _attachment.get('author_name'),

    thumb_height: _attachment.get('thumb_height'),

    thumb_url: _attachment.get('thumb_url'),

    thumb_width: _attachment.get('thumb_width'),

    video_height: _attachment.get('video_height'),

    video_url: _attachment.get('video_url'),

    video_width: _attachment.get('video_width'),

    asset: asset(_attachment.related('asset'))

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

exports.default = commentSerializer;