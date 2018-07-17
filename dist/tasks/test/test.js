'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = exports.run = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _collect_objects = require('../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _console = require('../../utils/console');

var _watch = require('../../utils/watch');

var _watch2 = _interopRequireDefault(_watch);

var _child_process = require('child_process');

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var run = exports.run = function run() {
  return (0, _watch2.default)('test', 'test:run');
};

var test = exports.test = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var mocha;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            (0, _console.info)('test', 'Running tests');

            mocha = new _mocha2.default();


            mocha.reporter('list');

            (0, _collect_objects2.default)('tests/**/*_test').map(function (test) {

              mocha.addFile(test);
            });

            _context.next = 6;
            return new _bluebird2.default(function (resolve, reject) {

              var runner = mocha.run(resolve);

              runner.on('test', function () {});

              runner.on('test end', function () {});

              runner.on('end', function () {});
            });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function test() {
    return _ref.apply(this, arguments);
  };
}();