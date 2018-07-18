'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../entities/server');

var _server2 = _interopRequireDefault(_server);

var _socket = require('../../entities/socket');

var _socket2 = _interopRequireDefault(_socket);

var _worker = require('../../entities/worker');

var _worker2 = _interopRequireDefault(_worker);

var _cron = require('../../entities/cron');

var _cron2 = _interopRequireDefault(_cron);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = exports.start = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(flags, args) {
    var entities;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            entities = args.entity || 'all';

            if (_lodash2.default.includes(['all', 'server', 'socket', 'worker', 'cron'], entities)) {
              _context.next = 3;
              break;
            }

            throw new Error('\'' + entities + '\' is not a valid entity');

          case 3:
            if (!_lodash2.default.includes(['all', 'server'], entities)) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return (0, _server2.default)();

          case 6:
            if (!_lodash2.default.includes(['all', 'socket'], entities)) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return (0, _socket2.default)();

          case 9:
            if (!_lodash2.default.includes(['all', 'worker'], entities)) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return (0, _worker2.default)();

          case 12:
            if (!_lodash2.default.includes(['all', 'cron'], entities)) {
              _context.next = 15;
              break;
            }

            _context.next = 15;
            return (0, _cron2.default)();

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function start(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();