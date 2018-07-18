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

var Activity = new _model2.default({

  tableName: 'maha_activities',

  displayName: 'activity',

  rules: {
    user_id: ['required']
  },

  app: function app() {
    return this.belongsTo(_app2.default, 'app_id');
  },
  object_owner: function object_owner() {
    return this.belongsTo(_user2.default, 'object_owner_id');
  },
  story: function story() {
    return this.belongsTo(_story2.default, 'story_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Activity;