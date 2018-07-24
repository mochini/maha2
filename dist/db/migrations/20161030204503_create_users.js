'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _migration = require('../../objects/migration');

var _migration2 = _interopRequireDefault(_migration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CreateUsers = new _migration2.default({

  up: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(knex) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex.schema.createTable('maha_users', function (table) {
                table.increments('id').primary();
                table.integer('team_id').unsigned();
                table.foreign('team_id').references('maha_teams.id');
                table.string('first_name');
                table.string('last_name');
                table.string('email');
                table.string('password_salt');
                table.string('password_hash');
                table.boolean('is_active').defaultTo(false);
                table.boolean('is_admin').defaultTo(false);
                table.integer('photo_id').unsigned();
                table.foreign('photo_id').references('maha_assets.id');
                table.integer('security_question_1_id').unsigned();
                table.foreign('security_question_1_id').references('maha_security_questions.id');
                table.string('security_question_1_answer');
                table.integer('security_question_2_id').unsigned();
                table.foreign('security_question_2_id').references('maha_security_questions.id');
                table.string('security_question_2_answer');
                table.string('notification_method');
                table.integer('unread').defaultTo(0);
                table.jsonb('values');
                table.timestamp('activated_at');
                table.timestamp('reset_at');
                table.timestamp('invalidated_at');
                table.timestamp('last_online_at');
                table.timestamps();
              });

            case 2:
              return _context.abrupt('return', _context.sent);

            case 3:
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(knex) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return knex.schema.dropTable('maha_users');

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

var _default = CreateUsers;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CreateUsers, 'CreateUsers', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;