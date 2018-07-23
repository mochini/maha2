'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = exports.dump = exports.version = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('../../lib/environment');

var _console = require('../../utils/console');

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

var version = exports.version = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(flags, args) {
    var migration;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _knex2.default)('schema_migrations').orderBy('migration', 'desc').limit(1);

          case 2:
            migration = _context.sent;


            (0, _console.action)('version', migration[0].migration.split('_')[0]);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function version(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var dump = exports.dump = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(flags, args) {
    var constraints, foreign_keys, tables, template, platform, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            (0, _console.action)('dump', 'schema');

            _context2.next = 3;
            return _getConstraints();

          case 3:
            constraints = _context2.sent;
            foreign_keys = _lodash2.default.groupBy(constraints.foreign, function (constraint) {
              return constraint.table;
            });
            _context2.next = 7;
            return _getTables(constraints);

          case 7:
            tables = _context2.sent;
            template = _fs2.default.readFileSync(_path2.default.join(__dirname, 'schema.js.ejs'), 'utf8');
            platform = _lodash2.default.camelCase(_path2.default.basename(_path2.default.resolve()));
            data = _ejs2.default.render(template, { platform: platform, tables: tables, foreign_keys: foreign_keys });


            _mkdirp2.default.sync(_path2.default.join('db'));

            _fs2.default.writeFileSync(_path2.default.join('db', 'schema.js'), data);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function dump(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var load = exports.load = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(flags, args) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:

            (0, _console.action)('load', 'schema');

            _context4.next = 3;
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

              return function (_x7) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function load(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _getTables = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(constraints) {
    var tables;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _knex2.default.raw('select tablename from pg_catalog.pg_tables where schemaname=\'public\'');

          case 2:
            tables = _context6.sent;
            _context6.next = 5;
            return (0, _bluebird.mapSeries)(tables.rows, function () {
              var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(table) {
                var fields;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _knex2.default.raw('select * from information_schema.columns where table_name=\'' + table.tablename + '\'');

                      case 2:
                        fields = _context5.sent;
                        return _context5.abrupt('return', {
                          name: table.tablename,
                          fields: fields.rows.map(function (field) {
                            return {
                              name: field.column_name,
                              definition: _getFieldType(field, constraints),
                              nullable: _getNullable(field),
                              default: _getDefault(field)
                            };
                          })
                        });

                      case 4:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x9) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 5:
            return _context6.abrupt('return', _context6.sent);

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function _getTables(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

var _getConstraints = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    var constraints;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _knex2.default.raw('SELECT tc.constraint_name, tc.constraint_type, tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name  FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema');

          case 2:
            constraints = _context7.sent;
            return _context7.abrupt('return', constraints.rows.reduce(function (constraints, constraint) {
              return (0, _extends3.default)({}, constraints, {
                primary: constraint.constraint_type === 'PRIMARY KEY' ? [].concat((0, _toConsumableArray3.default)(constraints.primary), [{
                  name: constraint.constraint_name,
                  table: constraint.table_name,
                  column: constraint.column_name
                }]) : constraints.primary,
                foreign: constraint.constraint_type === 'FOREIGN KEY' ? [].concat((0, _toConsumableArray3.default)(constraints.foreign), [{
                  name: constraint.constraint_name,
                  table: constraint.table_name,
                  column: constraint.column_name,
                  foreign_table: constraint.foreign_table_name,
                  foreign_column: constraint.foreign_column_name
                }]) : constraints.foreign
              });
            }, { primary: [], foreign: [] }));

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function _getConstraints() {
    return _ref7.apply(this, arguments);
  };
}();

var _getFieldType = function _getFieldType(field, constraints) {
  var primary = _lodash2.default.find(constraints.primary, { table: field.table_name, column: field.column_name });
  var foreign = _lodash2.default.find(constraints.foreign, { table: field.table_name, column: field.column_name });
  if (primary) return '.increments(\'' + field.column_name + '\').primary()';
  if (foreign) return '.integer(\'' + field.column_name + '\').unsigned()';
  if (field.data_type === 'character varying') return '.string(\'' + field.column_name + '\', ' + field.character_maximum_length + ')';
  if (field.data_type === 'text') return '.text(\'' + field.column_name + '\')';
  if (field.data_type === 'timestamp with time zone') return '.timestamp(\'' + field.column_name + '\')';
  if (field.data_type === 'ARRAY') return '.specificType(\'' + field.column_name + '\', \'' + field.udt_name.substr(1) + '[]\')';
  return '.' + field.data_type + '(\'' + field.column_name + '\')';
};

var _getNullable = function _getNullable(field) {
  return field.is_nullable ? '' : '.notNullable()';
};

var _getDefault = function _getDefault(field) {
  return field.column_default && field.column_default.substr(0, 7) !== 'nextval' ? '.defaultsTo(\'' + field.column_default + '\')' : '';
};