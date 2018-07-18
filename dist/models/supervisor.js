'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Supervisor = new _model2.default({

  tableName: 'maha_supervisors',

  displayName: 'supervisor',

  displayAttribute: 'full_name',

  rules: {
    user_id: 'required'
  },

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Supervisor;