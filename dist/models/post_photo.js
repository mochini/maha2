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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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

var _default = PostPhoto;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PostPhoto, 'PostPhoto', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;