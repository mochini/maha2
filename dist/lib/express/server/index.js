'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicMiddleware = exports.adminMiddleware = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _collect_objects = require('../../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _express = require('express');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this gets run when the platform first boots
// it searches through the apps for server.js files
// and combines all segments into a public router

var _apiSegment = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(pathPrefix, portal, auth) {
    var apiFiles;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            apiFiles = (0, _collect_objects2.default)(portal + '/api');
            _context2.next = 3;
            return (0, _bluebird.reduce)(apiFiles, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(segments, apiFile) {
                var router;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return require(_path2.default.resolve(apiFile)).default.mount('' + pathPrefix, {
                          authenticated: auth,
                          ownedByTeam: auth
                        });

                      case 2:
                        router = _context.sent;
                        return _context.abrupt('return', [].concat((0, _toConsumableArray3.default)(segments), [router]));

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }(), []);

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function _apiSegment(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _serverSegment = function _serverSegment(portal) {

  var serverFiles = (0, _collect_objects2.default)(portal + '/server.js');

  return serverFiles.reduce(function (router, serverFile) {

    return require(serverFile.filepath).default(router);
  }, new _express.Router({ mergeParams: true }));
};

var adminMiddleware = exports.adminMiddleware = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var api, server, router;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _apiSegment('/api', 'admin', true);

          case 2:
            api = _context3.sent;
            server = _serverSegment('admin');
            router = new _express.Router({ mergeParams: true });


            router.use(api);

            router.use(server);

            return _context3.abrupt('return', router);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function adminMiddleware() {
    return _ref3.apply(this, arguments);
  };
}();

var publicMiddleware = exports.publicMiddleware = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var api, server, router;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _apiSegment('/api', 'public', false);

          case 2:
            api = _context4.sent;
            server = _serverSegment('public');
            router = new _express.Router({ mergeParams: true });


            router.use(api);

            router.use(server);

            return _context4.abrupt('return', router);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function publicMiddleware() {
    return _ref4.apply(this, arguments);
  };
}();