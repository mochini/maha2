'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _collect_objects = require('../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = exports.test = function test() {

  var mocha = new _mocha2.default();

  (0, _collect_objects2.default)('tests/**/*_test').map(function (test) {

    mocha.addFile(_path2.default.join(test));
  });

  mocha.before = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(done) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              undefined.timeout(10000);

              console.log('before');

              // prepareTestDb().then(() => done())

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
  // 
  // mocha.beforeEach(async (done) => {
  //
  //   console.log('beforeEach')
  //
  //   // beginTransaction().then(() => done())
  //
  // })
  //
  // mocha.afterEach(async (done) => {
  //
  //   console.log('afterEach')
  //
  //   // rollbackTransaction().then(() => done())
  //
  // })


  mocha.run(function (failures) {

    process.exitCode = failures ? -1 : 0;
  });
}; // import { prepareTestDb, beginTransaction, rollbackTransaction } from 'core/dist/maha_test'