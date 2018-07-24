'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shipit = undefined;

var _shipitMaha = require('shipit-maha');

var _shipitMaha2 = _interopRequireDefault(_shipitMaha);

var _shipitCli = require('shipit-cli');

var _shipitCli2 = _interopRequireDefault(_shipitCli);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var shipfile = _path2.default.resolve('config', 'deploy.js');

var shipit = exports.shipit = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(flags, args) {
    var shipit, config;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shipit = new _shipitCli2.default({ environment: args.environment });
            config = require(shipfile);
            _context.next = 4;
            return shipit.initConfig(config);

          case 4:
            _context.next = 6;
            return (0, _shipitMaha2.default)(shipit);

          case 6:

            shipit.initialize();

            shipit.start(args.command);

            shipit.on('task_err', function (err) {

              process.exit(1);
            });

            shipit.on('task_not_found', function () {

              process.exit(1);
            });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function shipit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = shipit;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(shipfile, 'shipfile', 'unknown');
  reactHotLoader.register(shipit, 'shipit', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;