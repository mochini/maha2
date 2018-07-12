'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _backframe = require('../lib/backframe');

var _backframe2 = _interopRequireDefault(_backframe);

var _app_paths = require('../utils/app_paths');

var _app_paths2 = _interopRequireDefault(_app_paths);

var _app = require('../models/app');

var _app2 = _interopRequireDefault(_app);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Api = function () {
  function Api(options) {
    (0, _classCallCheck3.default)(this, Api);


    this.options = options;

    this.router = null;
  }

  (0, _createClass3.default)(Api, [{
    key: 'mount',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var appPath, app_id, routes;
        return _regenerator2.default.wrap(function _callee$(_context) {
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
                routes = _backframe2.default.segment((0, _extends3.default)({
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
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path) {
        var appFile, app;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
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
  }]);
  return Api;
}();

exports.default = Api;