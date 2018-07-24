'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _asset = require('./asset');

var _asset2 = _interopRequireDefault(_asset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Assignee = new _model2.default({

  tableName: 'maha_assignees',

  displayName: 'assignee',

  displayAttribute: 'name',

  photo: function photo() {
    return this.belongsTo(_asset2.default, 'photo_id');
  }
});

var _default = Assignee;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Assignee, 'Assignee', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;