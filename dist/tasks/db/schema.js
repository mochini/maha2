'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = exports.dump = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('../../lib/environment');

var _knex = require('../../lib/knex');

var _knex2 = _interopRequireDefault(_knex);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dump = exports.dump = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(flags, args) {
    var query, tables, template, platform, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _knex2.default.raw('SELECT tablename FROM pg_catalog.pg_tables where schemaname=\'public\'');

          case 2:
            query = _context2.sent;
            _context2.next = 5;
            return (0, _bluebird.mapSeries)(query.rows, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(row) {
                var fields;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _knex2.default)(row.tablename).columnInfo();

                      case 2:
                        fields = _context.sent;


                        console.log(fields);

                        return _context.abrupt('return', {
                          name: row.tablename,
                          fields: Object.keys(fields).map(function (name) {
                            return {
                              name: name,
                              type: _getFieldType(fields[name].type)
                            };
                          })
                        });

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 5:
            tables = _context2.sent;
            template = _fs2.default.readFileSync(_path2.default.join(__dirname, 'schema.js.ejs'), 'utf8');
            platform = _lodash2.default.camelCase(_path2.default.basename(_path2.default.resolve()));
            data = _ejs2.default.render(template, { tables: tables, platform: platform });


            _mkdirp2.default.sync(_path2.default.join('db'));

            _fs2.default.writeFileSync(_path2.default.join('db', 'schema.js'), data);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function dump(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var load = exports.load = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(flags, args) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _knex2.default.transaction(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(trx) {
                var schema;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        schema = require(_path2.default.resolve('db', 'schema.js')).default;
                        _context3.next = 3;
                        return schema.load(trx);

                      case 3:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x6) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function load(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _getFieldType = function _getFieldType(type) {
  if (type === 'character varying') return 'string';
  if (type === 'text') return 'text';
  if (type === 'timestamp with time zone') return 'timestamp';
  return type;
};