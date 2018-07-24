'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _asset = require('./asset');

var _asset2 = _interopRequireDefault(_asset);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Attachment = new _model2.default({

  tableName: 'maha_attachments',

  displayName: 'attachment',

  displayAttribute: '',

  asset: function asset() {
    return this.belongsTo(_asset2.default, 'asset_id');
  },
  service: function service() {
    return this.belongsTo(_service2.default, 'service_id');
  }
});

var _default = Attachment;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Attachment, 'Attachment', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;