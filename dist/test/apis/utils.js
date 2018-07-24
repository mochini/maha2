'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find_route = exports.make_authenticated_request = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jwt = require('../../lib/jwt');

var jwt = _interopRequireWildcard(_jwt);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var make_authenticated_request = exports.make_authenticated_request = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(router, request) {
    var route, token, req;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return find_route(router, request.method, request.path);

          case 2:
            route = _context.sent;
            token = jwt.encode({ user_id: 1 }, 60);
            req = {
              params: route.params,
              query: request.query || {},
              body: request.body || {},
              headers: {
                authorization: 'Bearer ' + token
              }
            };
            _context.next = 7;
            return new Promise(function (resolve, reject) {

              var res = {
                status: function status(_status) {
                  return {
                    json: function json(_json) {
                      resolve({ status: _status, json: _json });
                    }
                  };
                }
              };

              return route.handle(req, res);
            });

          case 7:
            return _context.abrupt('return', _context.sent);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function make_authenticated_request(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var find_route = exports.find_route = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(router, method, path) {
    var resolvedRouter;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return router;

          case 2:
            resolvedRouter = _context2.sent;
            return _context2.abrupt('return', resolvedRouter.stack.reduce(function (found, route) {

              if (found) return found;

              var matched = path.match(route.regexp);

              if (!matched) return null;

              if (matched && _lodash2.default.get(route, 'route.methods.' + method)) {

                var params = route.keys.reduce(function (params, key, index) {
                  return _extends({}, params, _defineProperty({}, key.name, matched[index + 1]));
                }, {});

                return {
                  handle: route.route.stack[0].handle,
                  params: params
                };
              }
            }, null));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function find_route(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(make_authenticated_request, 'make_authenticated_request', 'unknown');
  reactHotLoader.register(find_route, 'find_route', 'unknown');
  leaveModule(module);
})();

;