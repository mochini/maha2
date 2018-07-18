'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attachment = require('./attachment');

var _attachment2 = _interopRequireDefault(_attachment);

var _post_photo = require('./post_photo');

var _post_photo2 = _interopRequireDefault(_post_photo);

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = new _model2.default({

  tableName: 'maha_posts',

  displayName: 'review',

  displayAttribute: 'post',

  rules: {
    text: 'required'
  },

  attachments: function attachments() {
    return this.morphMany(_attachment2.default, 'attachable');
  },
  photos: function photos() {
    return this.hasMany(_post_photo2.default, 'post_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Post;