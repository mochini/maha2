'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Right = new _model2.default({

  tableName: 'maha_rights',

  displayName: 'right',

  displayAttribute: 'text',

  withRelated: 'app',

  rules: {
    text: 'required',
    app_id: 'required'
  },

  virtuals: {

    code: function code() {
      return this.related('app').get('title').toLowerCase() + ':' + this.get('text').toLowerCase().replace(/\s/, '_');
    }

  },

  app: function app() {
    return this.belongsTo(_app2.default, 'app_id');
  },
  roles: function roles() {
    return this.belongsToMany(_role2.default, 'maha_users_roles', 'user_id', 'role_id');
  }
});

exports.default = Right;