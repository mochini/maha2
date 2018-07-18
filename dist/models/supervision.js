'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Supervision = new _model2.default({

  tableName: 'maha_supervisions',

  displayName: 'supervision',

  supervisor: function supervisor() {
    return this.belongsTo(_user2.default, 'supervisor_id');
  },
  employee: function employee() {
    return this.belongsTo(_user2.default, 'employee_id');
  }
});

exports.default = Supervision;