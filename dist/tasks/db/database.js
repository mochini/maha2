'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drop = exports.create = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('../../lib/environment');

var _console = require('../../utils/console');

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _process$env$DATABASE = process.env.DATABASE_URL.match(/(.*)\/(.*)/),
    _process$env$DATABASE2 = _slicedToArray(_process$env$DATABASE, 3),
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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(flags, args) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(flags, args) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(connection, 'connection', 'unknown');
  reactHotLoader.register(database, 'database', 'unknown');
  reactHotLoader.register(knex, 'knex', 'unknown');
  reactHotLoader.register(create, 'create', 'unknown');
  reactHotLoader.register(drop, 'drop', 'unknown');
  leaveModule(module);
})();

;