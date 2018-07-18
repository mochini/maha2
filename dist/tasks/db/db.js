'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateDown = exports.migrateUp = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _collect_objects = require('../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var migrateUp = exports.migrateUp = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(flags, args) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function migrateUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var migrateDown = exports.migrateDown = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(flags, args) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function migrateDown(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var db = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var fixtures, migrations, seeds;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fixtures = (0, _collect_objects2.default)('db/fixtures/*');


            console.log(fixtures);

            migrations = (0, _collect_objects2.default)('db/migrations/*').sort(function (a, b) {

              var aMigration = a.split('/').pop();

              var bMigration = b.split('/').pop();

              if (aMigration > bMigration) return 1;

              if (aMigration < bMigration) return -1;

              return 0;
            });


            console.log(migrations);

            seeds = (0, _collect_objects2.default)('db/seeds/*');


            console.log(seeds);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function db() {
    return _ref3.apply(this, arguments);
  };
}();