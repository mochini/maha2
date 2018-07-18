'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _migration = require('../../objects/migration');

var _migration2 = _interopRequireDefault(_migration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddNotificationMethod = new _migration2.default({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(knex) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex.schema.createTable('maha_notification_channels', function (table) {
                table.increments('id').primary();
                table.string('text');
              });

            case 2:
              _context.next = 4;
              return knex('maha_notification_channels').insert([{ text: 'app' }, { text: 'push' }, { text: 'email' }]);

            case 4:
              _context.next = 6;
              return knex.schema.table('maha_notifications', function (table) {
                table.integer('channel_id').unsigned();
                table.foreign('channel_id').references('maha_notification_channels.id');
              });

            case 6:
              _context.next = 8;
              return knex('maha_notifications').update({
                channel_id: 1
              });

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function up(_x) {
      return _ref.apply(this, arguments);
    };
  }(),

  down: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(knex) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return knex.schema.table('maha_notifications', function (table) {
                table.dropColumn('channel_id');
              });

            case 2:
              _context2.next = 4;
              return knex.schema.dropTable('maha_notification_channels');

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function down(_x2) {
      return _ref2.apply(this, arguments);
    };
  }()

});

exports.default = AddNotificationMethod;