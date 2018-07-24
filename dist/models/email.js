'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _email_activity = require('./email_activity');

var _email_activity2 = _interopRequireDefault(_email_activity);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Email = new _model2.default({

  tableName: 'maha_emails',

  displayName: 'email',

  displayAttribute: 'subject',

  activities: function activities() {
    return this.hasMany(_email_activity2.default, 'email_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

var _default = Email;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Email, 'Email', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;