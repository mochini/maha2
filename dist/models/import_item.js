'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _import2 = require('./import');

var _import3 = _interopRequireDefault(_import2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImportItem = new _model2.default({

  tableName: 'maha_import_items',

  displayName: 'import_item',

  displayAttribute: '',

  rules: {},

  virtuals: {},

  belongsToTeam: false,

  hasTimestamps: false,

  import: function _import() {
    return this.belongsTo(_import3.default, 'import_id');
  }
});

exports.default = ImportItem;