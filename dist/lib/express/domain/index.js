'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicDomainMiddleware = exports.adminDomainMiddleware = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _collect_objects = require('../../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var files = (0, _collect_objects2.default)('public/domains.js');

var ifaces = _os2.default.networkInterfaces();

var ips = Object.keys(ifaces).reduce(function (ips, iface) {
  return [].concat(_toConsumableArray(ips), _toConsumableArray(ifaces[iface].map(function (adapter) {
    return adapter.address;
  })));
}, []);

var domain_regex = /^([\w-.]*):?(\d*)?$/;

var adminDomainMiddleware = exports.adminDomainMiddleware = function adminDomainMiddleware(middleware) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var _req$headers$host$mat, _req$headers$host$mat2, hostname;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.headers.host) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', next());

            case 2:
              _req$headers$host$mat = req.headers.host.match(domain_regex), _req$headers$host$mat2 = _slicedToArray(_req$headers$host$mat, 2), hostname = _req$headers$host$mat2[1];

              if (_lodash2.default.includes([process.env.DOMAIN, 'localhost', 'dev.mahaplatform.com'].concat(_toConsumableArray(ips)), hostname)) {
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var domains, _req$headers$host$mat3, _req$headers$host$mat4, hostname;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Promise.reduce(files, function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(domains, domain) {
                  var appDomains;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return require(domain.filepath).default();

                        case 2:
                          appDomains = _context2.sent;
                          return _context2.abrupt('return', [].concat(_toConsumableArray(domains), _toConsumableArray(appDomains)));

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
              _req$headers$host$mat3 = req.headers.host.match(domain_regex), _req$headers$host$mat4 = _slicedToArray(_req$headers$host$mat3, 2), hostname = _req$headers$host$mat4[1];

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
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(files, 'files', 'unknown');
  reactHotLoader.register(ifaces, 'ifaces', 'unknown');
  reactHotLoader.register(ips, 'ips', 'unknown');
  reactHotLoader.register(domain_regex, 'domain_regex', 'unknown');
  reactHotLoader.register(adminDomainMiddleware, 'adminDomainMiddleware', 'unknown');
  reactHotLoader.register(publicDomainMiddleware, 'publicDomainMiddleware', 'unknown');
  leaveModule(module);
})();

;