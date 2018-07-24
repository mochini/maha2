'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _email_link = require('./email_link');

var _email_link2 = _interopRequireDefault(_email_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var EmailActivity = new _model2.default({

  tableName: 'maha_email_activities',

  displayName: 'email activity',

  link: function link() {
    return this.belongsTo(_email_link2.default, 'email_link_id');
  }
});

var _default = EmailActivity;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(EmailActivity, 'EmailActivity', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;