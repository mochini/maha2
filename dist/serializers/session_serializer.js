'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user_tokens = require('../core/utils/user_tokens');

var _get_user_access = require('../core/utils/get_user_access');

var _get_user_access2 = _interopRequireDefault(_get_user_access);

var _notification = require('../models/notification');

var _notification2 = _interopRequireDefault(_notification);

var _load_navigation = require('../core/utils/load_navigation');

var _load_navigation2 = _interopRequireDefault(_load_navigation);

var _knex = require('../core/services/knex');

var _knex2 = _interopRequireDefault(_knex);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var navigation = (0, _load_navigation2.default)();

var _expandNavigation = function _expandNavigation(items, req) {

  return Promise.reduce(items, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(items, item) {
      var canAccess, subitems;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!item.access) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return item.access(req);

            case 3:
              _context.t0 = _context.sent;
              _context.next = 7;
              break;

            case 6:
              _context.t0 = true;

            case 7:
              canAccess = _context.t0;

              if (canAccess) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', items);

            case 10:
              if (!item.items) {
                _context.next = 16;
                break;
              }

              _context.next = 13;
              return _expandNavigation(item.items);

            case 13:
              _context.t1 = _context.sent;
              _context.next = 17;
              break;

            case 16:
              _context.t1 = [];

            case 17:
              subitems = _context.t1;
              return _context.abrupt('return', [].concat(_toConsumableArray(items), [_extends({
                label: item.label
              }, subitems.length > 0 ? { items: subitems } : {}, {
                route: item.route,
                rights: item.rights
              })]));

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), []);
};

var SessionSerializer = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, trx, user) {
    var access, apps, orderApps, notifications, token, team_id, users, online;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return user.load(['photo', 'team.logo', 'team.strategies'], { transacting: trx });

          case 2:

            req.team = user.related('team');

            _context3.next = 5;
            return (0, _get_user_access2.default)(req.user, trx);

          case 5:
            access = _context3.sent;
            _context3.next = 8;
            return Promise.reduce(Object.keys(access.apps), function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(apps, key) {
                var app, items;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        app = access.apps[key];

                        if (navigation[app.code]) {
                          _context2.next = 3;
                          break;
                        }

                        return _context2.abrupt('return', apps);

                      case 3:
                        if (!(!navigation[app.code].items || navigation[app.code].items.length === 0)) {
                          _context2.next = 5;
                          break;
                        }

                        return _context2.abrupt('return', [].concat(_toConsumableArray(apps), [app]));

                      case 5:
                        _context2.next = 7;
                        return _expandNavigation(navigation[app.code].items, req);

                      case 7:
                        items = _context2.sent;
                        return _context2.abrupt('return', [].concat(_toConsumableArray(apps), [_extends({}, app, {
                          items: items
                        })]));

                      case 9:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x6, _x7) {
                return _ref3.apply(this, arguments);
              };
            }(), []);

          case 8:
            apps = _context3.sent;
            orderApps = apps.sort(function (a, b) {

              if (a.label > b.label) return 1;

              if (a.label < b.label) return -1;

              return 0;
            });
            _context3.next = 12;
            return _notification2.default.where({
              user_id: user.get('id'),
              is_seen: false
            }).fetchAll({ transacting: trx });

          case 12:
            notifications = _context3.sent;
            token = (0, _user_tokens.createUserToken)(user, 'user_id');
            team_id = req.team.get('id');
            _context3.next = 17;
            return (0, _knex2.default)('maha_users').transacting(trx).where({ team_id: team_id }).whereRaw('last_online_at >= ?', (0, _moment2.default)().subtract(5, 'minutes'));

          case 17:
            users = _context3.sent;
            online = users.map(function (user) {
              return user.id;
            });
            return _context3.abrupt('return', {
              apps: orderApps,
              online: online,
              team: {
                id: user.related('team').get('id'),
                color: user.related('team').get('color'),
                title: user.related('team').get('title'),
                subdomain: user.related('team').get('subdomain'),
                logo: user.related('team').related('logo').get('path'),
                strategies: user.related('team').related('strategies').toJSON().map(function (strategy) {
                  return strategy.name;
                }),
                token: token
              },
              user: {
                id: user.get('id'),
                full_name: user.get('full_name'),
                initials: user.get('initials'),
                email: user.get('email'),
                photo: user.related('photo').get('path'),
                unseen: notifications.length,
                rights: access.rights
              }
            });

          case 20:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function SessionSerializer(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = SessionSerializer;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(navigation, 'navigation', 'unknown');
  reactHotLoader.register(_expandNavigation, '_expandNavigation', 'unknown');
  reactHotLoader.register(SessionSerializer, 'SessionSerializer', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;