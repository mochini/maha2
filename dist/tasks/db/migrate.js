'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateRedo = exports.fixturesLoad = exports.migrateDown = exports.migrateUp = undefined;

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
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(type) {
    var fixtures;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fixtures = _getSortedFiles('fixtures');
            _context3.next = 3;
            return (0, _bluebird.mapSeries)(fixtures, function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(fixture) {
                var config;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        config = require(_path2.default.resolve(fixture.path)).default;


                        console.log(config);

                      case 2:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function _loadData(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _migrate = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(direction) {
    var allMigrations, migrations;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _findOrCreateSchema();

          case 2:
            allMigrations = _getSortedFiles('migrations');
            _context4.next = 5;
            return _filterScripts(allMigrations, direction === 'down');

          case 5:
            migrations = _context4.sent;
            _context4.next = 8;
            return _runMigrations(migrations, direction);

          case 8:
            if (!(direction === 'down')) {
              _context4.next = 11;
              break;
            }

            _context4.next = 11;
            return _dropSchema();

          case 11:
            _context4.next = 13;
            return (0, _schema.dump)();

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function _migrate(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var _findOrCreateSchema = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var exists;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _knex2.default.schema.hasTable('schema_migrations');

          case 2:
            exists = _context5.sent;

            if (!exists) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return');

          case 5:
            _context5.next = 7;
            return _knex2.default.schema.createTable('schema_migrations', function (table) {

              table.string('migration');
            });

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function _findOrCreateSchema() {
    return _ref5.apply(this, arguments);
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
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(scripts, down) {
    var sorted;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            sorted = down ? scripts.reverse() : scripts;
            _context7.next = 3;
            return (0, _bluebird.filter)(sorted, function () {
              var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(script) {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return _hasScriptBeenRun(script.name);

                      case 2:
                        _context6.t0 = _context6.sent;
                        _context6.t1 = down;
                        return _context6.abrupt('return', _context6.t0 === _context6.t1);

                      case 5:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined);
              }));

              return function (_x8) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 3:
            return _context7.abrupt('return', _context7.sent);

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function _filterScripts(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

var _hasScriptBeenRun = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(migration, run) {
    var result;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _knex2.default)('schema_migrations').count('*').where({ migration: migration });

          case 2:
            result = _context8.sent;
            return _context8.abrupt('return', parseInt(result[0].count) === 1);

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function _hasScriptBeenRun(_x9, _x10) {
    return _ref8.apply(this, arguments);
  };
}();

var _runMigrations = function _runMigrations(migrations, direction) {

  return (0, _bluebird.mapSeries)(migrations, function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(migration) {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _knex2.default.transaction(function () {
                var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(trx) {
                  var runner, _logMigration;

                  return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:

                          (0, _console.action)('run', migration.name);

                          runner = require(_path2.default.resolve(migration.path)).default;
                          _context9.next = 4;
                          return runner[direction](trx);

                        case 4:
                          _logMigration = direction === 'up' ? _recordMigration : _removeMigration;
                          _context9.next = 7;
                          return _logMigration(migration.name, trx);

                        case 7:
                        case 'end':
                          return _context9.stop();
                      }
                    }
                  }, _callee9, undefined);
                }));

                return function (_x12) {
                  return _ref10.apply(this, arguments);
                };
              }());

            case 2:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function (_x11) {
      return _ref9.apply(this, arguments);
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
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _knex2.default.schema.dropTableIfExists('schema_migrations');

          case 2:
            return _context11.abrupt('return', _context11.sent);

          case 3:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function _dropSchema() {
    return _ref11.apply(this, arguments);
  };
}();