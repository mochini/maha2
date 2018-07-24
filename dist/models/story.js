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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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

var _default = Story;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Story, 'Story', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;