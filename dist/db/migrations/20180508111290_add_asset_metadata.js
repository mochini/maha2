'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _migration = require('../../objects/migration');

var _migration2 = _interopRequireDefault(_migration);

var _profile = require('../../models/profile');

var _profile2 = _interopRequireDefault(_profile);

var _asset = require('../../models/asset');

var _asset2 = _interopRequireDefault(_asset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var AddAssetMetadata = new _migration2.default({

  up: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(knex) {
      var map, profiles, assets, getUserId;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return knex.schema.createTable('maha_sources', function (table) {
                table.increments('id').primary();
                table.string('text');
              });

            case 2:
              _context4.next = 4;
              return knex('maha_sources').insert([{ text: 'device' }, { text: 'web' }, { text: 'email' }, { text: 'maha' }, { text: 'google' }, { text: 'microsoft' }, { text: 'facebook' }, { text: 'instagram' }, { text: 'dropbox' }, { text: 'box' }]);

            case 4:
              _context4.next = 6;
              return knex.schema.table('maha_profiles', function (table) {
                table.integer('source_id').unsigned();
                table.foreign('source_id').references('maha_sources.id');
              });

            case 6:
              map = {
                1: 5,
                6: 6,
                2: 7,
                3: 8,
                4: 9,
                5: 10
              };
              _context4.next = 9;
              return _profile2.default.fetchAll({ transacting: knex });

            case 9:
              profiles = _context4.sent;
              _context4.next = 12;
              return Promise.mapSeries(profiles.toArray(), function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(profile) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return profile.save({
                            source_id: map[profile.get('profile_type_id')]
                          }, { patch: true, transacting: knex });

                        case 2:
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

            case 12:
              _context4.next = 14;
              return knex.schema.table('maha_profiles', function (table) {
                table.dropColumn('profile_type_id');
              });

            case 14:
              _context4.next = 16;
              return knex.schema.table('maha_assets', function (table) {
                table.integer('user_id').unsigned();
                table.foreign('user_id').references('maha_users.id');
                table.integer('source_id').unsigned();
                table.foreign('source_id').references('maha_sources.id');
              });

            case 16:
              _context4.next = 18;
              return _asset2.default.fetchAll({ transacting: knex });

            case 18:
              assets = _context4.sent;

              getUserId = function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(asset) {
                  var asset_id, receipt, expense, reimbursement, check, user, version;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          asset_id = asset.get('id');

                          if (!(asset.get('team_id') === 7)) {
                            _context2.next = 3;
                            break;
                          }

                          return _context2.abrupt('return', 192);

                        case 3:
                          _context2.next = 5;
                          return knex('expenses_receipts').where({ asset_id: asset_id });

                        case 5:
                          receipt = _context2.sent;

                          if (!receipt[0]) {
                            _context2.next = 25;
                            break;
                          }

                          if (!receipt[0].expense_id) {
                            _context2.next = 13;
                            break;
                          }

                          _context2.next = 10;
                          return knex('expenses_expenses').where({ id: receipt[0].expense_id });

                        case 10:
                          expense = _context2.sent;

                          if (!expense[0]) {
                            _context2.next = 13;
                            break;
                          }

                          return _context2.abrupt('return', expense[0].user_id);

                        case 13:
                          if (!receipt[0].reimbursement_id) {
                            _context2.next = 19;
                            break;
                          }

                          _context2.next = 16;
                          return knex('expenses_reimbursements').where({ id: receipt[0].reimbursement_id });

                        case 16:
                          reimbursement = _context2.sent;

                          if (!reimbursement[0]) {
                            _context2.next = 19;
                            break;
                          }

                          return _context2.abrupt('return', reimbursement[0].user_id);

                        case 19:
                          if (!receipt[0].check_id) {
                            _context2.next = 25;
                            break;
                          }

                          _context2.next = 22;
                          return knex('expenses_reimbursements').where({ id: receipt[0].check_id });

                        case 22:
                          check = _context2.sent;

                          if (!check[0]) {
                            _context2.next = 25;
                            break;
                          }

                          return _context2.abrupt('return', check[0].user_id);

                        case 25:
                          _context2.next = 27;
                          return knex('maha_users').where({ photo_id: asset_id });

                        case 27:
                          user = _context2.sent;

                          if (!user[0]) {
                            _context2.next = 30;
                            break;
                          }

                          return _context2.abrupt('return', user[0].id);

                        case 30:
                          _context2.next = 32;
                          return knex('drive_versions').where({ asset_id: asset_id });

                        case 32:
                          version = _context2.sent;

                          if (!version[0]) {
                            _context2.next = 35;
                            break;
                          }

                          return _context2.abrupt('return', version[0].user_id);

                        case 35:
                          return _context2.abrupt('return', null);

                        case 36:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function getUserId(_x3) {
                  return _ref3.apply(this, arguments);
                };
              }();

              _context4.next = 22;
              return Promise.mapSeries(assets.toArray(), function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(asset) {
                  var user_id;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return getUserId(asset);

                        case 2:
                          user_id = _context3.sent;
                          _context3.next = 5;
                          return asset.save({
                            source_id: 1,
                            user_id: user_id
                          }, { patch: true, transacting: knex });

                        case 5:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, undefined);
                }));

                return function (_x4) {
                  return _ref4.apply(this, arguments);
                };
              }());

            case 22:
              _context4.next = 24;
              return knex.schema.dropTable('maha_profile_types');

            case 24:
              return _context4.abrupt('return', _context4.sent);

            case 25:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function up(_x) {
      return _ref.apply(this, arguments);
    };
  }(),

  down: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(knex) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return knex.schema.createTable('maha_profile_types', function (table) {
                table.increments('id').primary();
                table.string('text');
              });

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function down(_x5) {
      return _ref5.apply(this, arguments);
    };
  }()

});

var _default = AddAssetMetadata;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AddAssetMetadata, 'AddAssetMetadata', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;