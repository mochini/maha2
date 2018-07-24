'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test_route_does_not_exist = exports.test_route_exists = undefined;

var _chai = require('chai');

var _utils = require('./utils');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var test_route_exists = exports.test_route_exists = function test_route_exists(router, method, path) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var route;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.find_route)(router, method, path);

          case 2:
            route = _context.sent;


            (0, _chai.expect)(route).to.not.be.null;

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};

var test_route_does_not_exist = exports.test_route_does_not_exist = function test_route_does_not_exist(router, method, path) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var route;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _utils.find_route)(router, method, path);

          case 2:
            route = _context2.sent;


            (0, _chai.expect)(route).to.be.null;

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(test_route_exists, 'test_route_exists', 'unknown');
  reactHotLoader.register(test_route_does_not_exist, 'test_route_does_not_exist', 'unknown');
  leaveModule(module);
})();

;