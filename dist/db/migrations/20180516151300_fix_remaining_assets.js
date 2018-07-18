'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _migration = require('../../objects/migration');

var _migration2 = _interopRequireDefault(_migration);

var _asset = require('../../models/asset');

var _asset2 = _interopRequireDefault(_asset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FixRemainingAssets = new _migration2.default({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(knex) {
      var assets, getUserId;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _asset2.default.query(function (qb) {

                qb.whereNull('user_id');
              }).fetchAll({ transacting: knex });

            case 2:
              assets = _context3.sent;

              getUserId = function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
                  var asset_id, team, receipt, check, attachment, item;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          asset_id = asset.get('id');
                          _context.next = 3;
                          return knex('maha_teams').where({ logo_id: asset_id });

                        case 3:
                          team = _context.sent;

                          if (!team[0]) {
                            _context.next = 11;
                            break;
                          }

                          if (!(team[0].id === 1)) {
                            _context.next = 7;
                            break;
                          }

                          return _context.abrupt('return', 79);

                        case 7:
                          if (!(team[0].id === 7)) {
                            _context.next = 9;
                            break;
                          }

                          return _context.abrupt('return', 189);

                        case 9:
                          if (!(team[0].id === 8)) {
                            _context.next = 11;
                            break;
                          }

                          return _context.abrupt('return', 195);

                        case 11:
                          _context.next = 13;
                          return knex('expenses_receipts').where({ asset_id: asset_id });

                        case 13:
                          receipt = _context.sent;

                          if (!receipt[0]) {
                            _context.next = 21;
                            break;
                          }

                          if (!receipt[0].check_id) {
                            _context.next = 21;
                            break;
                          }

                          _context.next = 18;
                          return knex('expenses_checks').where({ id: receipt[0].check_id });

                        case 18:
                          check = _context.sent;

                          if (!check[0]) {
                            _context.next = 21;
                            break;
                          }

                          return _context.abrupt('return', check[0].user_id);

                        case 21:
                          _context.next = 23;
                          return knex('maha_attachments').where({ asset_id: asset_id });

                        case 23:
                          attachment = _context.sent;

                          if (!attachment[0]) {
                            _context.next = 32;
                            break;
                          }

                          _context.next = 27;
                          return knex(attachment[0].attachable_type).where({ id: attachment[0].attachable_id });

                        case 27:
                          item = _context.sent;

                          if (!item[0]) {
                            _context.next = 30;
                            break;
                          }

                          return _context.abrupt('return', item[0].user_id);

                        case 30:
                          _context.next = 32;
                          return knex('maha_attachments').where({ asset_id: asset_id }).del();

                        case 32:
                          return _context.abrupt('return', null);

                        case 33:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function getUserId(_x2) {
                  return _ref2.apply(this, arguments);
                };
              }();

              _context3.next = 6;
              return (0, _bluebird.mapSeries)(assets.toArray(), function () {
                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(asset) {
                  var user_id;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return getUserId(asset);

                        case 2:
                          user_id = _context2.sent;
                          _context2.next = 5;
                          return asset.save({
                            user_id: user_id
                          }, { patch: true, transacting: knex });

                        case 5:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }());

            case 6:
              _context3.next = 8;
              return knex('maha_assets').whereNull('user_id').del();

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function up(_x) {
      return _ref.apply(this, arguments);
    };
  }(),

  down: function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(knex) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function down(_x4) {
      return _ref4.apply(this, arguments);
    };
  }()

});

exports.default = FixRemainingAssets;