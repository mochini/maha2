'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateRedo = exports.seedsLoad = exports.fixturesLoad = exports.migrateDown = exports.migrateUp = undefined;

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('../../lib/environment');

var _collect_objects = require('../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _console = require('../../utils/console');

var _knex = require('../../lib/knex');

var _knex2 = _interopRequireDefault(_knex);

var _schema = require('./schema');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var migrateUp = exports.migrateUp = function migrateUp(flags, args) {
  return _migrate('up');
};

var migrateDown = exports.migrateDown = function migrateDown(flags, args) {
  return _migrate('down');
};

var fixturesLoad = exports.fixturesLoad = function fixturesLoad(flags, args) {
  return _loadData('fixtures');
};

var seedsLoad = exports.seedsLoad = function seedsLoad(flags, args) {
  return _loadData('seeds');
};

var migrateRedo = exports.migrateRedo = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(flags, args) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _migrate('down');

          case 2:
            _context.next = 4;
            return _migrate('up');

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function migrateRedo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _loadData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(type) {
    var files;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            files = _getSortedFiles(type);
            _context5.next = 3;
            return (0, _bluebird.mapSeries)(files, function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(file) {
                var fixture;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        fixture = require(_path2.default.resolve(file.path)).default;
                        _context4.next = 3;
                        return _knex2.default.transaction(function () {
                          var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(trx) {
                            var chunks, idColumn;
                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    _context3.next = 2;
                                    return trx.raw('set session_replication_role = replica');

                                  case 2:
                                    _context3.next = 4;
                                    return trx(fixture.tableName).del();

                                  case 4:
                                    chunks = _lodash2.default.chunk(fixture.records, 50);
                                    _context3.next = 7;
                                    return (0, _bluebird.mapSeries)(chunks, function () {
                                      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(chunk) {
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                          while (1) {
                                            switch (_context2.prev = _context2.next) {
                                              case 0:
                                                _context2.next = 2;
                                                return trx(fixture.tableName).insert(chunk);

                                              case 2:
                                                return _context2.abrupt('return', _context2.sent);

                                              case 3:
                                              case 'end':
                                                return _context2.stop();
                                            }
                                          }
                                        }, _callee2, undefined);
                                      }));

                                      return function (_x6) {
                                        return _ref5.apply(this, arguments);
                                      };
                                    }()).catch(console.log);

                                  case 7:
                                    _context3.prev = 7;
                                    _context3.next = 10;
                                    return trx.raw('SELECT column_name FROM information_schema.columns WHERE table_name=\'' + fixture.tableName + '\' and column_name=\'id\'');

                                  case 10:
                                    idColumn = _context3.sent;

                                    if (!(idColumn.rowCount > 0)) {
                                      _context3.next = 14;
                                      break;
                                    }

                                    _context3.next = 14;
                                    return trx.raw('SELECT pg_catalog.setval(pg_get_serial_sequence(\'' + fixture.tableName + '\', \'id\'), MAX(id)) FROM ' + fixture.tableName);

                                  case 14:
                                    _context3.next = 18;
                                    break;

                                  case 16:
                                    _context3.prev = 16;
                                    _context3.t0 = _context3['catch'](7);

                                  case 18:
                                    _context3.next = 20;
                                    return trx.raw('set session_replication_role = default');

                                  case 20:

                                    (0, _console.action)('import', fixture.tableName);

                                  case 21:
                                  case 'end':
                                    return _context3.stop();
                                }
                              }
                            }, _callee3, undefined, [[7, 16]]);
                          }));

                          return function (_x5) {
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

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function _loadData(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _migrate = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(direction) {
    var allMigrations, migrations;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _findOrCreateSchema();

          case 2:
            allMigrations = _getSortedFiles('migrations');
            _context6.next = 5;
            return _filterScripts(allMigrations, direction === 'down');

          case 5:
            migrations = _context6.sent;
            _context6.next = 8;
            return _runMigrations(migrations, direction);

          case 8:
            if (!(direction === 'down')) {
              _context6.next = 11;
              break;
            }

            _context6.next = 11;
            return _dropSchema();

          case 11:
            _context6.next = 13;
            return (0, _schema.dump)();

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function _migrate(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

var _findOrCreateSchema = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    var exists;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _knex2.default.schema.hasTable('schema_migrations');

          case 2:
            exists = _context7.sent;

            if (!exists) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt('return');

          case 5:
            _context7.next = 7;
            return _knex2.default.schema.createTable('schema_migrations', function (table) {

              table.string('migration');
            });

          case 7:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function _findOrCreateSchema() {
    return _ref7.apply(this, arguments);
  };
}();

var _getSortedFiles = function _getSortedFiles(targetPath) {

  return (0, _collect_objects2.default)('db/' + targetPath + '/*').filter(function (file) {

    return !_lodash2.default.isNil(file.match(/.*\.js$/));
  }).sort(function (a, b) {

    var aMigration = a.split('/').pop();

    var bMigration = b.split('/').pop();

    if (aMigration > bMigration) return 1;

    if (aMigration < bMigration) return -1;

    return 0;
  }).map(function (file) {
    return {

      path: file,

      name: _path2.default.basename(file)

    };
  });
};

var _filterScripts = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(scripts, down) {
    var sorted;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            sorted = down ? scripts.reverse() : scripts;
            _context9.next = 3;
            return (0, _bluebird.filter)(sorted, function () {
              var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(script) {
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return _hasScriptBeenRun(script.name);

                      case 2:
                        _context8.t0 = _context8.sent;
                        _context8.t1 = down;
                        return _context8.abrupt('return', _context8.t0 === _context8.t1);

                      case 5:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, undefined);
              }));

              return function (_x10) {
                return _ref9.apply(this, arguments);
              };
            }());

          case 3:
            return _context9.abrupt('return', _context9.sent);

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function _filterScripts(_x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();

var _hasScriptBeenRun = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(migration, run) {
    var result;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _knex2.default)('schema_migrations').count('*').where({ migration: migration });

          case 2:
            result = _context10.sent;
            return _context10.abrupt('return', parseInt(result[0].count) === 1);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function _hasScriptBeenRun(_x11, _x12) {
    return _ref10.apply(this, arguments);
  };
}();

var _runMigrations = function _runMigrations(migrations, direction) {

  return (0, _bluebird.mapSeries)(migrations, function () {
    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(migration) {
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _knex2.default.transaction(function () {
                var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(trx) {
                  var runner, _logMigration;

                  return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:

                          (0, _console.action)('run', migration.name);

                          runner = require(_path2.default.resolve(migration.path)).default;
                          _context11.next = 4;
                          return runner[direction](trx);

                        case 4:
                          _logMigration = direction === 'up' ? _recordMigration : _removeMigration;
                          _context11.next = 7;
                          return _logMigration(migration.name, trx);

                        case 7:
                        case 'end':
                          return _context11.stop();
                      }
                    }
                  }, _callee11, undefined);
                }));

                return function (_x14) {
                  return _ref12.apply(this, arguments);
                };
              }());

            case 2:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    }));

    return function (_x13) {
      return _ref11.apply(this, arguments);
    };
  }());
};

var _recordMigration = function _recordMigration(migration, trx) {

  return trx('schema_migrations').insert({ migration: migration });
};

var _removeMigration = function _removeMigration(migration, trx) {

  return trx('schema_migrations').where({ migration: migration }).delete();
};

var _dropSchema = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _knex2.default.schema.dropTableIfExists('schema_migrations');

          case 2:
            return _context13.abrupt('return', _context13.sent);

          case 3:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function _dropSchema() {
    return _ref13.apply(this, arguments);
  };
}();