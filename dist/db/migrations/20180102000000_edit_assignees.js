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

var EditAssignees = new _migration2.default({

  up: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(knex) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex.raw('drop view maha_assignees');

            case 2:
              _context.next = 4;
              return knex.raw('\n      create or replace view maha_assignees AS\n      select row_number() over (order by "assignees"."type" ASC, "assignees"."last_name" ASC) as id,\n      "assignees".*\n      from (\n      select \'everyone\' as type,\n      0 as "item_id",\n      "maha_teams"."id" as "team_id",\n      \'Everyone\' as "last_name",\n      \'Everyone\' as "name",\n      null as "initials",\n      0 as "photo_id",\n      null as "created_at",\n      null as "updated_at"\n      from "maha_teams"\n      union\n      select \'group\' as type,\n      "maha_groups"."id" as "item_id",\n      "maha_groups"."team_id",\n      "maha_groups"."title" as "last_name",\n      "maha_groups"."title" as "name",\n      null as "initials",\n      null as "photo_id",\n      "maha_groups"."created_at",\n      "maha_groups"."updated_at"\n      from "maha_groups"\n      union\n      select \'user\' as type,\n      "maha_users"."id" as "item_id",\n      "maha_users"."team_id",\n      "maha_users"."last_name",\n      concat("maha_users"."first_name", \' \', "maha_users"."last_name") as "name",\n      concat(lower(substring("maha_users"."first_name" from 1 for 1)), lower(substring("maha_users"."last_name" from 1 for 1))) as "initials",\n      "maha_users"."photo_id",\n      "maha_users"."created_at",\n      "maha_users"."updated_at"\n      from "maha_users"\n      ) as "assignees"\n    ');

            case 4:
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
              return knex.raw('drop view maha_assignees');

            case 2:
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

var _default = EditAssignees;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(EditAssignees, 'EditAssignees', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;