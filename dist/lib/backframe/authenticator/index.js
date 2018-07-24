'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _backframe = require('backframe');

var _device = require('../../../models/device');

var _device2 = _interopRequireDefault(_device);

var _passport = require('../../express/passport');

var _passport2 = _interopRequireDefault(_passport);

var _rollbar = require('../../rollbar');

var _rollbar2 = _interopRequireDefault(_rollbar);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alterRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, options) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (options.authenticated) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return', req);

          case 2:
            _context2.next = 4;
            return new _bluebird2.default(function (resolve, reject) {

              return (0, _passport2.default)('user_id', trx).authenticate('jwt', { session: false }, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, user, info) {
                  var invalidated_at, fingerprint;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:

                          if (err) reject(new _backframe.BackframeError({ code: 401, message: 'Unable to find user' }));

                          if (!user) reject(new _backframe.BackframeError({ code: 401, message: info.message }));

                          invalidated_at = user.get('invalidated_at');


                          if (invalidated_at && (0, _moment2.default)(invalidated_at).unix() - info.iat > 0) reject(new _backframe.BackframeError({ code: 401, message: 'This token has expired' }));

                          fingerprint = req.headers.fingerprint;

                          if (!fingerprint) {
                            _context.next = 9;
                            break;
                          }

                          _context.next = 8;
                          return _device2.default.where({ fingerprint: fingerprint }).fetch({ transacting: trx });

                        case 8:
                          req.device = _context.sent;

                        case 9:

                          req.jwt = info;

                          req.team = user.related('team');

                          req.user = user;

                          _rollbar2.default.configure({
                            payload: {
                              person: {
                                id: user.get('id'),
                                username: user.get('full_name'),
                                email: user.get('email')
                              },
                              request: {
                                headers: req.headers,
                                params: req.params,
                                query: req.query,
                                body: req.body
                              }
                            }
                          });

                          _context.next = 15;
                          return _updateSession(req, trx, options);

                        case 15:

                          resolve(req);

                        case 16:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x4, _x5, _x6) {
                  return _ref2.apply(this, arguments);
                };
              }())(req);
            });

          case 4:
            return _context2.abrupt('return', _context2.sent);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function alterRequest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _updateSession = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, options) {
    var data, last_active_at, last_online_at;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (req.device) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return');

          case 2:
            data = {
              device_id: req.device.get('id'),
              user_id: req.user.get('id')
            };
            last_active_at = (0, _moment2.default)();
            _context3.next = 6;
            return options.knex('maha_sessions').transacting(trx).where(data).update({ last_active_at: last_active_at });

          case 6:
            last_online_at = (0, _moment2.default)();
            _context3.next = 9;
            return req.user.save({ last_online_at: last_online_at }, { patch: true, transacting: trx });

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function _updateSession(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _backframe.plugin)({
  name: 'authenticator',
  options: {
    authenticated: {
      type: 'boolean',
      default: false
    }
  },
  alterRequest: alterRequest
});