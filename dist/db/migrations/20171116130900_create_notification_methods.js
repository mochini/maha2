'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _migration = require('../../objects/migration');

var _migration2 = _interopRequireDefault(_migration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateLinks = new _migration2.default({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(knex) {
      var users;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return knex.schema.createTable('maha_notification_methods', function (table) {
                table.increments('id').primary();
                table.string('icon');
                table.string('title');
                table.string('text');
              });

            case 2:
              _context2.next = 4;
              return knex('maha_notification_methods').insert([{ icon: 'clock-o', title: 'On Demand', text: 'Send me an email whenever I miss a notification' }, { icon: 'calendar', title: 'Daily Digest', text: 'Send me a daily email with all of my missed notifcations from the previous day' }, { icon: 'ban', title: 'Do nothing', text: 'Please do not send me any notifications via email' }]);

            case 4:
              _context2.next = 6;
              return knex.schema.table('maha_users', function (table) {
                table.integer('notification_method_id').unsigned();
                table.foreign('notification_method_id').references('maha_notification_methods.id');
              });

            case 6:
              _context2.next = 8;
              return knex('maha_users');

            case 8:
              users = _context2.sent;
              _context2.next = 11;
              return (0, _bluebird.mapSeries)(users, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(user.notification_method === 'immediately')) {
                            _context.next = 6;
                            break;
                          }

                          _context.next = 3;
                          return knex('maha_users').where({ id: user.id }).update({ notification_method_id: 1 });

                        case 3:
                          return _context.abrupt('return', _context.sent);

                        case 6:
                          if (!(user.notification_method === 'daily')) {
                            _context.next = 12;
                            break;
                          }

                          _context.next = 9;
                          return knex('maha_users').where({ id: user.id }).update({ notification_method_id: 2 });

                        case 9:
                          return _context.abrupt('return', _context.sent);

                        case 12:
                          if (!(user.notification_method === 'nothing')) {
                            _context.next = 16;
                            break;
                          }

                          _context.next = 15;
                          return knex('maha_users').where({ id: user.id }).update({ notification_method_id: 3 });

                        case 15:
                          return _context.abrupt('return', _context.sent);

                        case 16:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 11:
              _context2.next = 13;
              return knex.schema.table('maha_users', function (table) {
                table.dropColumn('notification_method');
              });

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function up(_x) {
      return _ref.apply(this, arguments);
    };
  }(),

  down: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(knex) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return knex.schema.table('maha_users', function (table) {
                table.dropColumn('notification_method_id');
              });

            case 2:
              _context3.next = 4;
              return knex.schema.dropTable('maha_notification_methods');

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function down(_x3) {
      return _ref3.apply(this, arguments);
    };
  }()

});

exports.default = CreateLinks;