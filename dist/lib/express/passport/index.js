'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passportJwt = require('passport-jwt');

var _passportLocal = require('passport-local');

var _user = require('../../../models/user');

var _user2 = _interopRequireDefault(_user);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = function passport(key, trx) {

  var jwtOptions = {
    jwtFromRequest: _passportJwt.ExtractJwt.fromExtractors([_passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer'), _passportJwt.ExtractJwt.fromUrlQueryParameter('token')]),
    secretOrKey: process.env.SECRET || ''
  };

  _passport2.default.use(new _passportJwt.Strategy(jwtOptions, function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload, done) {
      var id, user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (payload.data[key]) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', done(null, false, { message: 'invalid jwt' }));

            case 2:
              id = payload.data[key];
              _context.next = 5;
              return _user2.default.where({ id: id }).fetch({ withRelated: ['photo', 'team'], transacting: trx });

            case 5:
              user = _context.sent;

              if (user) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', done(null, false, { message: 'cannot find user' }));

            case 8:

              done(null, user, payload);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()));

  _passport2.default.use(new _passportLocal.Strategy({ usernameField: 'email' }, function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(email, password, done) {
      var user;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _user2.default.where({ email: email }).fetch({ transacting: trx });

            case 2:
              user = _context2.sent;

              if (user) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return', done(null, false, { message: 'cannot find user' }));

            case 5:
              if (user.authenticate(password)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', done(null, false, { message: 'invalid password' }));

            case 7:

              done(null, user);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }()));

  return _passport2.default;
};

exports.default = passport;