'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test_allowed_keys = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chai = require('chai');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test_allowed_keys = exports.test_allowed_keys = function test_allowed_keys(router, method, path, body) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var request, _ref2, status;

    return _regenerator2.default.wrap(function _callee$(_context) {
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