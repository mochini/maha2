'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _source = require('./source');

var _source2 = _interopRequireDefault(_source);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Profile = new _model2.default({

  tableName: 'maha_profiles',

  displayName: 'profile',

  displayAttribute: 'type',

  rules: {},

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  },
  source: function source() {
    return this.belongsTo(_source2.default, 'source_id');
  }
});

exports.default = Profile;