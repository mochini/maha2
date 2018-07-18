'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicDomainMiddleware = exports.adminDomainMiddleware = undefined;

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _collect_objects = require('../../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var files = (0, _collect_objects2.default)('public/domains.js');

var ifaces = _os2.default.networkInterfaces();

var ips = Object.keys(ifaces).reduce(function (ips, iface) {
  return [].concat((0, _toConsumableArray3.default)(ips), (0, _toConsumableArray3.default)(ifaces[iface].map(function (adapter) {
    return adapter.address;
  })));
}, []);

var domain_regex = /^([\w-.]*):?(\d*)?$/;

var adminDomainMiddleware = exports.adminDomainMiddleware = function adminDomainMiddleware(middleware) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var _req$headers$host$mat, _req$headers$host$mat2, hostname;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.headers.host) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', next());

            case 2:
              _req$headers$host$mat = req.headers.host.match(domain_regex), _req$headers$host$mat2 = (0, _slicedToArray3.default)(_req$headers$host$mat, 2), hostname = _req$headers$host$mat2[1];

              if (_lodash2.default.includes([process.env.DOMAIN, 'localhost', 'dev.mahaplatform.com'].concat((0, _toConsumableArray3.default)(ips)), hostname)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', next());

            case 5:

              middleware(req, res, next);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

var publicDomainMiddleware = exports.publicDomainMiddleware = function publicDomainMiddleware(middleware) {
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
      var domains, _req$headers$host$mat3, _req$headers$host$mat4, hostname;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _bluebird.reduce)(files, function () {
                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(domains, domain) {
                  var appDomains;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return require(domain.filepath).default();

                        case 2:
                          appDomains = _context2.sent;
                          return _context2.abrupt('return', [].concat((0, _toConsumableArray3.default)(domains), (0, _toConsumableArray3.default)(appDomains)));

                        case 4:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x7, _x8) {
                  return _ref3.apply(this, arguments);
                };
              }(), []);

            case 2:
              domains = _context3.sent;
              _req$headers$host$mat3 = req.headers.host.match(domain_regex), _req$headers$host$mat4 = (0, _slicedToArray3.default)(_req$headers$host$mat3, 2), hostname = _req$headers$host$mat4[1];

              if (_lodash2.default.includes(domains, hostname)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt('return', next());

            case 6:

              middleware(req, res, next);

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();
};