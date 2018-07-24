'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _installation = require('../models/installation');

var _installation2 = _interopRequireDefault(_installation);

var _right = require('../models/right');

var _right2 = _interopRequireDefault(_right);

var _app = require('../models/app');

var _app2 = _interopRequireDefault(_app);

var _knex = require('../lib/knex');

var _knex2 = _interopRequireDefault(_knex);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, trx) {
    var apps, installations, rights, appMap, assginedApps, assignedRights;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _app2.default.fetchAll({ transacting: trx });

          case 2:
            apps = _context.sent;
            _context.next = 5;
            return _installation2.default.query(function (qb) {

              qb.select(_knex2.default.raw('distinct on (maha_installations.app_id) maha_installations.*'));

              qb.innerJoin('maha_roles_apps', 'maha_roles_apps.app_id', 'maha_installations.app_id');

              qb.innerJoin('maha_users_roles', 'maha_users_roles.role_id', 'maha_roles_apps.role_id');

              qb.where('maha_installations.team_id', '=', user.get('team_id'));

              qb.where('maha_users_roles.user_id', '=', user.get('id'));
            }).fetchAll({ transacting: trx });

          case 5:
            installations = _context.sent;
            _context.next = 8;
            return _right2.default.query(function (qb) {

              qb.select(_knex2.default.raw('distinct on (maha_rights.id) maha_rights.*'));

              qb.innerJoin('maha_roles_rights', 'maha_roles_rights.right_id', 'maha_rights.id');

              qb.innerJoin('maha_users_roles', 'maha_users_roles.role_id', 'maha_roles_rights.role_id');

              qb.where('maha_users_roles.user_id', '=', user.get('id'));
            }).fetchAll({ transacting: trx });

          case 8:
            rights = _context.sent;
            appMap = apps.reduce(function (apps, app) {
              return _extends({}, apps, _defineProperty({}, app.get('id'), app));
            }, {});
            assginedApps = installations.reduce(function (apps, installation) {

              var app = appMap[installation.get('app_id')];

              var code = _lodash2.default.toLower(_lodash2.default.camelCase(app.get('title')));

              var appFile = _fs2.default.readdirSync(_path2.default.resolve('apps')).reduce(function (found, app) {

                return app || (app === code ? _path2.default.resolve('apps', app, 'app.js') : null);
              }, null);

              var config = require(appFile).default.config;

              return _extends({}, apps, _defineProperty({}, code, {
                id: app.get('id'),
                code: code,
                label: config['title'],
                icon: config['icon'],
                color: config['color'],
                route: config['path'],
                settings: installation.get('settings')
              }));
            }, {});
            assignedRights = rights.map(function (right) {
              return right.get('code');
            });
            return _context.abrupt('return', {
              apps: assginedApps,
              rights: assignedRights
            });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function _default(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;