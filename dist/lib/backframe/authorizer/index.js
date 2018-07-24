'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _checkit = require('checkit');

var _checkit2 = _interopRequireDefault(_checkit);

var _backframe = require('backframe');

var _get_user_access = require('../../../utils/get_user_access');

var _get_user_access2 = _interopRequireDefault(_get_user_access);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadAppsRights = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options, req, trx) {
    var access;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _get_user_access2.default)(req.user, trx);

          case 2:
            access = _context.sent;


            req.apps = access.apps;

            req.rights = access.rights;

            return _context.abrupt('return', req);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function loadAppsRights(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var checkRules = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options, req, trx) {
    var rules;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!_lodash2.default.isFunction(options.rules)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return options.rules(req, trx, options);

          case 4:
            _context2.t0 = _context2.sent;
            _context2.next = 8;
            break;

          case 7:
            _context2.t0 = options.rules;

          case 8:
            rules = _context2.t0;
            _context2.next = 11;
            return (0, _checkit2.default)(rules).run(req.body);

          case 11:
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t1 = _context2['catch'](0);
            throw new _backframe.BackframeError({ code: 422, message: 'Unable to complete request', errors: _context2.t1.toJSON() });

          case 16:
            return _context2.abrupt('return', req);

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 13]]);
  }));

  return function checkRules(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var checkApp = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(options, req, trx) {
    var app_ids, allowed;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            app_ids = Object.keys(req.apps).reduce(function (ids, app) {
              return [].concat((0, _toConsumableArray3.default)(ids), [req.apps[app].id]);
            }, []);
            allowed = _lodash2.default.includes(app_ids, options.app_id);

            if (allowed) {
              _context3.next = 4;
              break;
            }

            throw new _backframe.BackframeError({ code: 403, message: 'You do not have access to this app.' });

          case 4:
            return _context3.abrupt('return', req);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function checkApp(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var checkRights = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(options, req, trx) {
    var rights, allowed;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            rights = _lodash2.default.isPlainObject(options.rights) ? options.rights[options.action] : options.rights;

            if (rights) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt('return', req);

          case 3:
            allowed = rights.reduce(function (allowed, right) {

              return allowed ? _lodash2.default.includes(req.rights, right) : false;
            }, true);

            if (allowed) {
              _context4.next = 6;
              break;
            }

            throw new _backframe.BackframeError({ code: 403, message: 'You do not have the rights to access this resource.' });

          case 6:
            return _context4.abrupt('return', req);

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function checkRights(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var alterRequest = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, trx, options) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(options.rules && !_lodash2.default.includes(['list', 'show'], options.action))) {
              _context5.next = 4;
              break;
            }

            _context5.next = 3;
            return checkRules(options, req, trx);

          case 3:
            req = _context5.sent;

          case 4:
            if (req.user) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt('return', req);

          case 6:
            _context5.next = 8;
            return loadAppsRights(options, req, trx);

          case 8:
            req = _context5.sent;

            if (!options.app_id) {
              _context5.next = 13;
              break;
            }

            _context5.next = 12;
            return checkApp(options, req, trx);

          case 12:
            req = _context5.sent;

          case 13:
            if (!options.rights) {
              _context5.next = 17;
              break;
            }

            _context5.next = 16;
            return checkRights(options, req, trx);

          case 16:
            req = _context5.sent;

          case 17:
            return _context5.abrupt('return', req);

          case 18:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function alterRequest(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = (0, _backframe.plugin)({
  alterRequest: alterRequest,
  name: 'authorizer',
  options: {
    rights: {
      type: ['string[]', 'string[]{}'],
      required: false
    },
    rules: {
      type: 'object',
      required: false
    }
  }
});