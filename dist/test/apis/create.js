'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test_allowed_keys = undefined;

var _chai = require('chai');

var _utils = require('./utils');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var test_allowed_keys = exports.test_allowed_keys = function test_allowed_keys(router, method, path, body) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var request, _ref2, status;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = {
              method: method,
              path: path,
              body: body
            };
            _context.next = 3;
            return (0, _utils.make_authenticated_request)(router, request);

          case 3:
            _ref2 = _context.sent;
            status = _ref2.status;


            (0, _chai.expect)(status).to.equal(200);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(test_allowed_keys, 'test_allowed_keys', 'unknown');
  leaveModule(module);
})();

;