'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collect_objects = require('../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _console = require('../utils/console');

var _later = require('later');

var _later2 = _interopRequireDefault(_later);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cron = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var cronFiles;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cronFiles = (0, _collect_objects2.default)('cron/*_cron');
            _context2.next = 3;
            return Promise.map(cronFiles, function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cronFile) {
                var cron, schedule;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:

                        (0, _console.info)('cron', 'Scheduling job ' + cronFile);

                        cron = require(_path2.default.resolve(cronFile)).default;
                        schedule = _later2.default.parse.cron(cron.schedule, true);


                        _later2.default.setInterval(cron.handler, schedule);

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function cron() {
    return _ref.apply(this, arguments);
  };
}();

var _default = cron;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(cron, 'cron', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;