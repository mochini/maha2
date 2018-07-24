'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _asset = require('./asset');

var _asset2 = _interopRequireDefault(_asset);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

var _notification_method = require('./notification_method');

var _notification_method2 = _interopRequireDefault(_notification_method);

var _security_question = require('./security_question');

var _security_question2 = _interopRequireDefault(_security_question);

var _supervision = require('./supervision');

var _supervision2 = _interopRequireDefault(_supervision);

var _team = require('./team');

var _team2 = _interopRequireDefault(_team);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var User = new _model2.default({

  tableName: 'maha_users',

  displayName: 'user',

  displayAttribute: 'full_name',

  withRelated: 'photo',

  rules: {
    first_name: 'required',
    last_name: 'required',
    email: ['required', 'email', 'unique']
  },

  virtuals: {

    full_name: function full_name() {
      return this.get('first_name') + ' ' + this.get('last_name');
    },

    f_last: function f_last() {
      return this.get('first_initial') + this.get('last_name').toLowerCase();
    },

    first_initial: function first_initial() {
      return this.get('first_name') ? this.get('first_name')[0].toLowerCase() : '';
    },

    last_initial: function last_initial() {
      return this.get('last_name') ? this.get('last_name')[0].toLowerCase() : '';
    },

    initials: function initials() {
      return this.get('first_initial') + this.get('last_initial');
    },

    rfc822: function rfc822() {
      return this.get('full_name') + ' <' + this.get('email') + '>';
    },

    group_ids: function group_ids() {
      return this.related('groups').map(function (group) {
        return group.id;
      });
    },

    role_ids: function role_ids() {
      return this.related('roles').map(function (role) {
        return role.id;
      });
    },

    supervisor_ids: function supervisor_ids() {
      return this.related('supervisors').map(function (supervisor) {
        return supervisor.id;
      });
    },

    password: {
      get: function get() {},
      set: function set(value) {
        var password_salt = _bcryptNodejs2.default.genSaltSync(10);
        this.set('password_salt', password_salt);
        this.set('password_hash', _bcryptNodejs2.default.hashSync(value, password_salt));
      }
    }

  },

  notification_method: function notification_method() {
    return this.belongsTo(_notification_method2.default, 'notification_method_id');
  },
  photo: function photo() {
    return this.belongsTo(_asset2.default, 'photo_id');
  },
  security_question: function security_question() {
    return this.belongsTo(_security_question2.default, 'security_question_id');
  },
  groups: function groups() {
    return this.belongsToMany(_group2.default, 'maha_users_groups', 'user_id', 'group_id');
  },
  roles: function roles() {
    return this.belongsToMany(_role2.default, 'maha_users_roles', 'user_id', 'role_id');
  },


  supervisors: function supervisors() {
    return this.hasMany(User).through(_supervision2.default, 'id', 'employee_id', 'supervisor_id');
  },

  team: function team() {
    return this.belongsTo(_team2.default, 'team_id');
  },
  authenticate: function authenticate(password) {
    return this.get('password_hash') === _bcryptNodejs2.default.hashSync(password, this.get('password_salt'));
  }
});

var _default = User;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(User, 'User', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;