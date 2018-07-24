'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _backframe = require('backframe');

var _app = require('../../../../models/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alterRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (options.app_id) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', req);

          case 2:
            _context.next = 4;
            return _app2.default.where({ id: options.app_id }).fetch({ transacting: trx });

          case 4:
            req.app = _context.sent;
            return _context.abrupt('return', req);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function alterRequest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = (0, _backframe.plugin)({
  name: 'audit',
  options: {
    app_id: {
      type: 'integer',
      required: false
    }
  },
  alterRequest: alterRequest
});