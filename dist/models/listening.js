'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Listening = new _model2.default({

  tableName: 'maha_listenings',

  displayName: 'listener',

  displayAttribute: '',

  rules: {
    listenable_type: 'required',
    listenable_id: 'required',
    user_id: 'required'
  },

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Listening;