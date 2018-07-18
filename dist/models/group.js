'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = new _model2.default({

  tableName: 'maha_groups',

  displayName: 'group',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique']
  },

  users: function users() {
    return this.belongsToMany(_user2.default, 'maha_users_groups', 'group_id', 'user_id');
  }
});

exports.default = Group;