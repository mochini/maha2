'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _email_link = require('./email_link');

var _email_link2 = _interopRequireDefault(_email_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailActivity = new _model2.default({

  tableName: 'maha_email_activities',

  displayName: 'email activity',

  link: function link() {
    return this.belongsTo(_email_link2.default, 'email_link_id');
  }
});

exports.default = EmailActivity;