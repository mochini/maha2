'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _import2 = require('./import');

var _import3 = _interopRequireDefault(_import2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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

var _default = ImportItem;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ImportItem, 'ImportItem', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;