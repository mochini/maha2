'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = exports.run = undefined;

var _collect_objects = require('../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _console = require('../../utils/console');

var _watch = require('../../utils/watch');

var _watch2 = _interopRequireDefault(_watch);

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var run = exports.run = function run(flags, args) {
  return (0, _watch2.default)('test', 'test:run');
};

var test = exports.test = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(flags, args) {
    var mocha;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
            return new Promise(function (resolve, reject) {

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

  return function test(_x, _x2) {
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

  reactHotLoader.register(run, 'run', 'unknown');
  reactHotLoader.register(test, 'test', 'unknown');
  leaveModule(module);
})();

;