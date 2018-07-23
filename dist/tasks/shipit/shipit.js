'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shipit = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _shipitMaha = require('shipit-maha');

var _shipitMaha2 = _interopRequireDefault(_shipitMaha);

var _shipitCli = require('shipit-cli');

var _shipitCli2 = _interopRequireDefault(_shipitCli);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shipfile = _path2.default.resolve('config', 'deploy.js');

var shipit = exports.shipit = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(flags, args) {
    var shipit, config;
    return _regenerator2.default.wrap(function _callee$(_context) {
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

exports.default = shipit;