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

var CreateEmails = new _migration2.default({

  up: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(knex) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex.schema.createTable('maha_emails', function (table) {
                table.increments('id').primary();
                table.integer('team_id').unsigned();
                table.foreign('team_id').references('maha_teams.id');
                table.integer('user_id').unsigned();
                table.foreign('user_id').references('maha_users.id');
                table.string('code');
                table.string('to');
                table.string('cc');
                table.string('bcc');
                table.string('subject');
                table.string('status');
                table.string('ses_id');
                table.string('bounce_type');
                table.string('bounce_subtype');
                table.string('complaint_type');
                table.text('html');
                table.text('text');
                table.string('error');
                table.boolean('was_delivered').defaultTo('false');
                table.boolean('was_opened').defaultTo('false');
                table.boolean('was_bounced').defaultTo('false');
                table.boolean('was_complained').defaultTo('false');
                table.integer('attempts').defaultTo(0);
                table.timestamp('sent_at');
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
              return knex.schema.dropTable('maha_emails');

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

var _default = CreateEmails;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CreateEmails, 'CreateEmails', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;