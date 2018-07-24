'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backframe = require('../lib/backframe');

var _backframe2 = _interopRequireDefault(_backframe);

var _app_paths = require('../utils/app_paths');

var _app_paths2 = _interopRequireDefault(_app_paths);

var _app = require('../models/app');

var _app2 = _interopRequireDefault(_app);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
  function Api(options) {
    _classCallCheck(this, Api);

    this.options = options;

    this.router = null;
  }

  _createClass(Api, [{
    key: 'mount',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var appPath, app_id, routes;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.router) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', this.router);

              case 2:
                appPath = path.split('/').pop();
                _context.next = 5;
                return this._getAppId('/' + appPath);

              case 5:
                app_id = _context.sent;
                routes = _backframe2.default.segment(_extends({
                  pathPrefix: path,
                  app_id: app_id
                }, options, this.options));


                this.router = _backframe2.default.router({ routes: routes, notFound: false });

                return _context.abrupt('return', this.router);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mount(_x) {
        return _ref.apply(this, arguments);
      }

      return mount;
    }()
  }, {
    key: '_getAppId',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path) {
        var appFile, app;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(process.env.NODE_ENV === 'test' || path === '')) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', null);

              case 2:
                appFile = _lodash2.default.find(_app_paths2.default, { config: { path: path } });

                if (appFile) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', null);

              case 5:
                _context2.next = 7;
                return _app2.default.where({ title: appFile.config.title }).fetch();

              case 7:
                app = _context2.sent;
                return _context2.abrupt('return', app ? app.get('id') : null);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _getAppId(_x3) {
        return _ref2.apply(this, arguments);
      }

      return _getAppId;
    }()
  }, {
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Api;
}();

var _default = Api;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Api, 'Api', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;