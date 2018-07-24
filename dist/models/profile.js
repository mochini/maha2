'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _source = require('./source');

var _source2 = _interopRequireDefault(_source);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Profile = new _model2.default({

  tableName: 'maha_profiles',

  displayName: 'profile',

  displayAttribute: 'type',

  rules: {},

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  },
  source: function source() {
    return this.belongsTo(_source2.default, 'source_id');
  }
});

var _default = Profile;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Profile, 'Profile', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;