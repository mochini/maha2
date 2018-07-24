'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendViaPush = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _webPush = require('web-push');

var _webPush2 = _interopRequireDefault(_webPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendViaPush = exports.sendViaPush = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(session, notification) {
    var options, payload, config;
    return _regenerator2.default.wrap(function _callee$(_context) {
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