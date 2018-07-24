'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendViaPush = undefined;

var _webPush = require('web-push');

var _webPush2 = _interopRequireDefault(_webPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sendViaPush = exports.sendViaPush = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(session, notification) {
    var options, payload, config;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              gcmAPIKey: process.env.FCM_API_KEY,
              vapidDetails: {
                subject: 'mailto:greg@thinktopography.com',
                publicKey: process.env.VAPID_PUBLIC_KEY,
                privateKey: process.env.VAPID_PRIVATE_KEY
              }
            };
            payload = JSON.stringify(notification);
            config = {
              endpoint: session.related('device').get('push_endpoint'),
              keys: {
                p256dh: session.related('device').get('push_p256dh'),
                auth: session.related('device').get('push_auth')
              }
            };
            _context.next = 5;
            return _webPush2.default.sendNotification(config, payload, options);

          case 5:
            return _context.abrupt('return', _context.sent);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function sendViaPush(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(sendViaPush, 'sendViaPush', 'unknown');
  leaveModule(module);
})();

;