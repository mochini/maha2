'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationMethod = new _model2.default({

  tableName: 'maha_notification_methods',

  displayName: 'notification_method',

  displayAttribute: 'title',

  users: function users() {
    return this.belongsToMany(_user2.default, 'notification_method_id');
  }
});

exports.default = NotificationMethod;