'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _activity = require('./activity');

var _activity2 = _interopRequireDefault(_activity);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Story = new _model2.default({

  tableName: 'maha_stories',

  displayName: 'story',

  displayAttribute: 'text',

  hasTimestamps: [],

  belongsToTeam: false,

  rules: {
    text: 'required'
  }

});

exports.default = Story;