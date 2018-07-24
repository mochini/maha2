'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _asset_status = require('./asset_status');

var _asset_status2 = _interopRequireDefault(_asset_status);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _source = require('./source');

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Assets = new _model2.default({

  tableName: 'maha_assets',

  displayName: 'asset',

  displayAttribute: 'file_name',

  virtuals: {

    extension: function extension() {
      return this.get('file_name').split('.').pop();
    },

    identifier: function identifier() {
      return this.get('file_size') + '-' + this.get('original_file_name').replace(/[^0-9a-zA-Z_-]/img, '');
    },

    is_image: function is_image() {
      return this.get('content_type').match(/image/) !== null;
    },

    has_preview: function has_preview() {
      var is_pdf = this.get('content_type').match(/pdf/) !== null;
      var is_doc = this.get('content_type').match(/msword/) !== null;
      var is_xls = this.get('content_type').match(/excel/) !== null;
      var is_openoffice = this.get('content_type').match(/officedocument/) !== null;
      var is_email = this.get('content_type').match(/rfc822/) !== null;
      var is_html = this.get('content_type').match(/html/) !== null;
      return is_pdf || is_doc || is_xls || is_email || is_openoffice || is_html;
    },

    path: function path() {
      return !this.isNew() ? '/assets/' + this.get('id') + '/' + this.get('file_name') : null;
    },

    url: function url() {
      return !this.isNew() ? '' + process.env.DATA_ASSET_CDN_HOST + this.get('path') : null;
    }

  },

  source: function source() {
    return this.belongsTo(_source2.default, 'source_id');
  },
  status: function status() {
    return this.belongsTo(_asset_status2.default, 'status_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

var _default = Assets;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Assets, 'Assets', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;