'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _htmlEmailToText = require('html-email-to-text');

var _htmlEmailToText2 = _interopRequireDefault(_htmlEmailToText);

var _ses = require('../lib/ses');

var _ses2 = _interopRequireDefault(_ses);

var _inlineCss = require('inline-css');

var _inlineCss2 = _interopRequireDefault(_inlineCss);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sendMail = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email) {
    var html, rendered;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _inlineCss2.default)(email.html, { url: process.env.WEB_HOST, preserveMediaQueries: true });

          case 2:
            html = _context.sent;
            rendered = _extends({}, email, {
              to: process.env.EMAIL_REDIRECT || email.to,
              html: html,
              text: (0, _htmlEmailToText2.default)(email.html)
            });
            _context.prev = 4;

            if (!(process.env.EMAIL_DELIVERY === 'console')) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return _sendViaConsole(rendered);

          case 8:
            return _context.abrupt('return', _context.sent);

          case 9:
            if (!(process.env.EMAIL_DELIVERY === 'ses')) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return _sendViaSES(rendered);

          case 12:
            return _context.abrupt('return', _context.sent);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](4);
            return _context.abrupt('return', { error: _context.t0.message });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 15]]);
  }));

  return function sendMail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _sendViaConsole = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(rendered) {
    var output;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            output = [Array(86).join('-'), 'TO: ' + rendered.to, 'SUBJECT: ' + rendered.subject, Array(86).join('-'), rendered.text, Array(86).join('-')];


            console.mail(output.join('\n'));

            return _context2.abrupt('return', { sent_at: (0, _moment2.default)() });

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function _sendViaConsole(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _sendViaSES = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(rendered) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return new Promise(function (resolve, reject) {

              _ses2.default.sendMail(rendered, function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, info) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:

                          if (err) reject(err);

                          resolve(info);

                        case 2:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, undefined);
                }));

                return function (_x4, _x5) {
                  return _ref4.apply(this, arguments);
                };
              }());
            });

          case 2:
            result = _context4.sent;
            return _context4.abrupt('return', { ses_id: result.response, sent_at: (0, _moment2.default)() });

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function _sendViaSES(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = sendMail;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(sendMail, 'sendMail', 'unknown');
  reactHotLoader.register(_sendViaConsole, '_sendViaConsole', 'unknown');
  reactHotLoader.register(_sendViaSES, '_sendViaSES', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;