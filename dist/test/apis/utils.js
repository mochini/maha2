'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find_route = exports.make_authenticated_request = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jwt = require('../../lib/jwt');

var jwt = _interopRequireWildcard(_jwt);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var make_authenticated_request = exports.make_authenticated_request = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(router, request) {
    var route, token, req;
    return _regenerator2.default.wrap(function _callee$(_context) {
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
            return new _bluebird2.default(function (resolve, reject) {

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
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(router, method, path) {
    var resolvedRouter;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
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
                  return (0, _extends4.default)({}, params, (0, _defineProperty3.default)({}, key.name, matched[index + 1]));
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