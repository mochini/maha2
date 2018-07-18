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

var CreateLinks = new _migration2.default({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(knex) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex.schema.createTable('maha_attachments', function (table) {
                table.increments('id').primary();
                table.integer('team_id').unsigned();
                table.foreign('team_id').references('maha_teams.id');
                table.integer('post_id').unsigned();
                table.foreign('post_id').references('maha_posts.id');
                table.integer('comment_id').unsigned();
                table.foreign('comment_id').references('maha_comments.id');
                table.integer('review_id').unsigned();
                table.foreign('review_id').references('maha_reviews.id');
                table.integer('delta');
                table.string('type');
                table.integer('image_bytes');
                table.integer('image_width');
                table.integer('image_height');
                table.string('image_url');
                table.integer('thumb_width');
                table.integer('thumb_height');
                table.string('thumb_url');
                table.string('video_url');
                table.string('video_height');
                table.string('video_width');
                table.string('service_name');
                table.string('service_icon');
                table.string('service_url');
                table.string('text');
                table.string('title');
                table.string('title_link');
                table.string('author_link');
                table.string('author_name');
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
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(knex) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return knex.schema.dropTable('maha_attachments');

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

exports.default = CreateLinks;