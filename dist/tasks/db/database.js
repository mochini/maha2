'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drop = exports.create = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

require('../../lib/environment');

var _console = require('../../utils/console');

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env$DATABASE = process.env.DATABASE_URL.match(/(.*)\/(.*)/),
    _process$env$DATABASE2 = (0, _slicedToArray3.default)(_process$env$DATABASE, 3),
    connection = _process$env$DATABASE2[1],
    database = _process$env$DATABASE2[2];

var knex = new _knex2.default({
  client: 'postgresql',
  connection: connection + '/postgres',
  useNullAsDefault: true,
  pool: {
    min: 1,
    max: 1
  }
});

var create = exports.create = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(flags, args) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            (0, _console.action)('createdb', database);

            _context.next = 3;
            return knex.raw('CREATE DATABASE ' + database);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var drop = exports.drop = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(flags, args) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            (0, _console.action)('dropdb', database);

            _context2.next = 3;
            return knex.raw('DROP DATABASE ' + database);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function drop(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();