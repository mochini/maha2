'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rollbar = require('rollbar');

var _rollbar2 = _interopRequireDefault(_rollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var rollbarCreator = function rollbarCreator(env) {

  if (env === 'production') {

    return new _rollbar2.default({
      accessToken: process.env.ROLLBAR_SERVER_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: 'server'
      }
    });
  }

  return {
    configure: function configure(config) {},
    error: console.error,
    info: console.info,
    log: console.log
  };
};

var rollbar = rollbarCreator(process.env.NODE_ENV);

var _default = rollbar;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rollbarCreator, 'rollbarCreator', 'unknown');
  reactHotLoader.register(rollbar, 'rollbar', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;