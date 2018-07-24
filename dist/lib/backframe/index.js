'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backframe = require('backframe');

var _backframe2 = _interopRequireDefault(_backframe);

var _knex = require('../knex');

var _knex2 = _interopRequireDefault(_knex);

var _redis = require('../redis');

var _redis2 = _interopRequireDefault(_redis);

var _authenticator = require('./authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

var _authorizer = require('./authorizer');

var _authorizer2 = _interopRequireDefault(_authorizer);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _owned_by_team = require('./owned_by_team');

var _owned_by_team2 = _interopRequireDefault(_owned_by_team);

var _owned_by_user = require('./owned_by_user');

var _owned_by_user2 = _interopRequireDefault(_owned_by_user);

var _activities = require('./activities');

var _activities2 = _interopRequireDefault(_activities);

var _auditor = require('./auditor');

var _auditor2 = _interopRequireDefault(_auditor);

var _listeners = require('./listeners');

var _listeners2 = _interopRequireDefault(_listeners);

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _notifier = require('./notifier');

var _notifier2 = _interopRequireDefault(_notifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _default = (0, _backframe2.default)({
  knex: _knex2.default,
  redis: _redis2.default,
  plugins: [_authenticator2.default, _authorizer2.default, _app2.default, _owned_by_team2.default, _owned_by_user2.default, _listeners2.default, _activities2.default, _auditor2.default, _emitter2.default, _notifier2.default]
});

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;