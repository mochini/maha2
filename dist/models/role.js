'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _right = require('./right');

var _right2 = _interopRequireDefault(_right);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Role = new _model2.default({

  tableName: 'maha_roles',

  displayName: 'role',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique'],
    description: 'required'
  },

  apps: function apps() {
    return this.belongsToMany(_app2.default, 'maha_roles_apps', 'role_id', 'app_id');
  },
  rights: function rights() {
    return this.belongsToMany(_right2.default, 'maha_roles_rights', 'role_id', 'right_id');
  },
  users: function users() {
    return this.belongsToMany(_user2.default, 'maha_users_roles', 'role_id', 'user_id');
  }
});

exports.default = Role;