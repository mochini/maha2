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

var CreateImports = new _migration2.default({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(knex) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex.schema.createTable('maha_imports', function (table) {
                table.increments('id').primary();
                table.integer('team_id').unsigned().references('maha_teams.id');
                table.integer('user_id').unsigned().references('maha_users.id');
                table.integer('asset_id').unsigned().references('maha_assets.id');
                table.string('object_type');
                table.string('name');
                table.enum('stage', ['previewing', 'mapping', 'configuring', 'validating', 'processing', 'complete']);
                table.boolean('headers').defaultTo(false);
                table.string('delimiter');
                table.enum('strategy', ['ignore', 'overwrite', 'discard', 'create']);
                table.specificType('mapping', 'jsonb[]');
                table.string('primary_key');
                table.integer('item_count');
                table.integer('created_count');
                table.integer('merged_count');
                table.integer('ignored_count');
                table.timestamps();
              });

            case 2:
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
              return knex.schema.dropTable('maha_imports');

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
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

exports.default = CreateImports;