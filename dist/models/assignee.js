'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _asset = require('./asset');

var _asset2 = _interopRequireDefault(_asset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Assignee = new _model2.default({

  tableName: 'maha_assignees',

  displayName: 'assignee',

  displayAttribute: 'name',

  photo: function photo() {
    return this.belongsTo(_asset2.default, 'photo_id');
  }
});

exports.default = Assignee;