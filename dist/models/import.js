'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _asset = require('./asset');

var _asset2 = _interopRequireDefault(_asset);

var _import_item = require('./import_item');

var _import_item2 = _interopRequireDefault(_import_item);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Import = new _model2.default({

  tableName: 'maha_imports',

  displayName: 'import',

  displayAttribute: 'description',

  rules: {
    asset_id: ['required']
  },

  virtuals: {

    description: function description() {
      if (this.get('name')) return this.get('name');
      if (this.get('asset_id')) return this.related('asset').get('original_file_name');
      return 'Import on ' + (0, _moment2.default)(this.get('created_at')).format('MM/DD/YYYY');
    }

  },

  asset: function asset() {
    return this.belongsTo(_asset2.default, 'asset_id');
  },
  items: function items() {
    return this.belongsTo(_import_item2.default, 'import_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Import;