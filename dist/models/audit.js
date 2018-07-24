'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _story = require('./story');

var _story2 = _interopRequireDefault(_story);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Audit = new _model2.default({

  tableName: 'maha_audits',

  displayName: 'audit',

  displayAttribute: '',

  story: function story() {
    return this.belongsTo(_story2.default, 'story_id');
  },

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }

});

var _default = Audit;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Audit, 'Audit', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;