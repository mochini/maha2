'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _device_value = require('./device_value');

var _device_value2 = _interopRequireDefault(_device_value);

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Device = new _model2.default({

  tableName: 'maha_devices',

  displayName: 'devices',

  displayAttribute: '',

  belongsToTeam: false,

  virtuals: {

    is_push_enabled: function is_push_enabled() {
      return this.get('push_auth') !== null;
    }

  },

  device_type: function device_type() {
    return this.belongsTo(_device_value2.default, 'device_type_id');
  },
  browser_name: function browser_name() {
    return this.belongsTo(_device_value2.default, 'browser_name_id');
  },
  browser_version: function browser_version() {
    return this.belongsTo(_device_value2.default, 'browser_version_id');
  },
  os_name: function os_name() {
    return this.belongsTo(_device_value2.default, 'os_name_id');
  },
  os_version: function os_version() {
    return this.belongsTo(_device_value2.default, 'os_version_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Device;