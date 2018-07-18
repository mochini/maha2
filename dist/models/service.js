'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _attachment = require('./attachment');

var _attachment2 = _interopRequireDefault(_attachment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Service = new _model2.default({

  tableName: 'maha_services',

  displayName: 'attachment',

  displayAttribute: '',

  belongsToTeam: false,

  hasTimestamps: false,

  attachments: function attachments() {
    return this.hasMany(_attachment2.default, 'service_id');
  }
});

exports.default = Service;