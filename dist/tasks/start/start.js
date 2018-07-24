'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

require('../../lib/environment');

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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var entities = ['all', 'server', 'socket', 'worker', 'cron'];

var start = exports.start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(flags, args) {
    var entity;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            entity = args.entity || 'all';

            if (_lodash2.default.includes(entities, entity)) {
              _context.next = 3;
              break;
            }

            throw new Error('\'' + entity + '\' is not a valid entity');

          case 3:
            if (!_lodash2.default.includes(['all', 'server'], entity)) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return (0, _server2.default)();

          case 6:
            if (!_lodash2.default.includes(['all', 'socket'], entity)) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return (0, _socket2.default)();

          case 9:
            if (!_lodash2.default.includes(['all', 'worker'], entity)) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return (0, _worker2.default)();

          case 12:
            if (!_lodash2.default.includes(['all', 'cron'], entity)) {
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
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(entities, 'entities', 'unknown');
  reactHotLoader.register(start, 'start', 'unknown');
  leaveModule(module);
})();

;