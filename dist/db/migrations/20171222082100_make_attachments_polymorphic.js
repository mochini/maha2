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

var MakeAttachmentsPolymorphic = new _migration2.default({

  up: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(knex) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex.schema.createTable('maha_services', function (table) {
                table.increments('id').primary();
                table.string('name');
                table.string('icon');
                table.string('url');
              });

            case 2:
              _context.next = 4;
              return knex.schema.table('maha_attachments', function (table) {
                table.text('from_url');
                table.string('attachable_type');
                table.integer('attachable_id');
                table.integer('asset_id').unsigned();
                table.foreign('asset_id').references('maha_assets.id');
                table.integer('service_id').unsigned();
                table.foreign('service_id').references('maha_services.id');
              });

            case 4:
              _context.next = 6;
              return knex.schema.table('maha_attachments', function (table) {
                table.dropColumn('comment_id');
                table.dropColumn('review_id');
                table.dropColumn('post_id');
                table.dropColumn('service_name');
                table.dropColumn('service_icon');
                table.dropColumn('service_url');
              });

            case 6:
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
              return knex.schema.table('maha_attachments', function (table) {
                table.integer('post_id').unsigned();
                table.foreign('post_id').references('maha_posts.id');
                table.integer('comment_id').unsigned();
                table.foreign('comment_id').references('maha_comments.id');
                table.integer('review_id').unsigned();
                table.foreign('review_id').references('maha_reviews.id');
              });

            case 2:
              _context2.next = 4;
              return knex.schema.table('maha_attachments', function (table) {
                table.string('from_url');
                table.dropColumn('attachable_type');
                table.dropColumn('attachable_id');
                table.dropColumn('asset_id');
              });

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

var _default = MakeAttachmentsPolymorphic;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MakeAttachmentsPolymorphic, 'MakeAttachmentsPolymorphic', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;