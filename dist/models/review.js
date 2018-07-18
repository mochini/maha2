'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attachment = require('./attachment');

var _attachment2 = _interopRequireDefault(_attachment);

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Review = new _model2.default({

  tableName: 'maha_reviews',

  displayName: 'review',

  displayAttribute: '',

  rules: {
    score: ['required', 'greaterThanEqualTo:0', 'lessThanEqualTo:5'],
    text: 'required'
  },

  virtuals: {},

  attachments: function attachments() {
    return this.morphMany(_attachment2.default, 'attachable');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Review;