'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var EmailTemplate = new _model2.default({

  tableName: 'maha_email_templates',

  displayName: 'email template',

  displayAttribute: 'name'

});

var _default = EmailTemplate;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(EmailTemplate, 'EmailTemplate', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;