'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _story = require('./story');

var _story2 = _interopRequireDefault(_story);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Notification = new _model2.default({

  tableName: 'maha_notifications',

  displayName: 'notification',

  rules: {
    user_id: ['required']
  },

  app: function app() {
    return this.belongsTo(_app2.default, 'app_id');
  },
  object_owner: function object_owner() {
    return this.belongsTo(_user2.default, 'object_owner_id');
  },
  subject: function subject() {
    return this.belongsTo(_user2.default, 'subject_id');
  },
  object: function object() {
    return this.morphTo('object', ['object_table', 'object_id']);
  },
  story: function story() {
    return this.belongsTo(_story2.default, 'story_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

var _default = Notification;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Notification, 'Notification', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;