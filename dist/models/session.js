'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Session = new _model2.default({

  tableName: 'maha_sessions',

  displayName: 'sessions',

  displayAttribute: '',

  device: function device() {
    return this.belongsTo(_device2.default, 'device_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

var _default = Session;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Session, 'Session', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;