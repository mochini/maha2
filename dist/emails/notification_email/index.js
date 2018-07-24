'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _email = require('../../core/objects/email');

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var notificationEmail = (0, _email2.default)({
  code: 'maha.notification',
  name: 'Notification',
  subject: 'Here\'s what you\'ve missed!'
});

var _default = notificationEmail;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(notificationEmail, 'notificationEmail', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;