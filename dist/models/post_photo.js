'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _asset = require('./asset');

var _asset2 = _interopRequireDefault(_asset);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostPhoto = new _model2.default({

  tableName: 'maha_posts_photos',

  displayName: 'photo',

  asset: function asset() {
    return this.belongsTo(_asset2.default, 'asset_id');
  },
  post: function post() {
    return this.belongsTo(_post2.default, 'post_id');
  }
});

exports.default = PostPhoto;