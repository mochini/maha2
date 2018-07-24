'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backframe = require('backframe');

var _app = require('../../../models/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var alterRequest = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, trx, options) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
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

var _default = (0, _backframe.plugin)({
  name: 'audit',
  options: {
    app_id: {
      type: 'integer',
      required: false
    }
  },
  alterRequest: alterRequest
});

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(alterRequest, 'alterRequest', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;