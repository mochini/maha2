'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationType = new _model2.default({

  tableName: 'maha_notification_types',

  displayName: 'notificationType'

});

exports.default = NotificationType;