'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _attachment = require('./attachment');

var _attachment2 = _interopRequireDefault(_attachment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Service = new _model2.default({

  tableName: 'maha_services',

  displayName: 'attachment',

  displayAttribute: '',

  belongsToTeam: false,

  hasTimestamps: false,

  attachments: function attachments() {
    return this.hasMany(_attachment2.default, 'service_id');
  }
});

var _default = Service;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Service, 'Service', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;