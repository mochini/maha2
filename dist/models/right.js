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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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

var _default = Right;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Right, 'Right', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;