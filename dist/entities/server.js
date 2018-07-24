'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _domain = require('../lib/express/domain');

var _server = require('../lib/express/server');

var _imagecache = require('../lib/express/imagecache');

var _imagecache2 = _interopRequireDefault(_imagecache);

var _toureiro = require('../lib/express/toureiro');

var _toureiro2 = _interopRequireDefault(_toureiro);

var _console = require('../utils/console');

var _ping = require('../lib/express/ping');

var _ping2 = _interopRequireDefault(_ping);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var server;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            server = (0, _express2.default)();


            server.use('/ping', _ping2.default);

            server.use('/jobs', _toureiro2.default);

            server.use('/imagecache', _imagecache2.default);

            // server.use(emailMiddleware)
            //
            // server.use(mailboxMiddleware)
            //
            // router.use(await helpMiddleware())

            _context.t0 = server;
            _context.t1 = _domain.adminDomainMiddleware;
            _context.next = 8;
            return (0, _server.adminMiddleware)();

          case 8:
            _context.t2 = _context.sent;
            _context.t3 = (0, _context.t1)(_context.t2);

            _context.t0.use.call(_context.t0, _context.t3);

            _context.t4 = server;
            _context.t5 = _domain.publicDomainMiddleware;
            _context.next = 15;
            return (0, _server.publicMiddleware)();

          case 15:
            _context.t6 = _context.sent;
            _context.t7 = (0, _context.t5)(_context.t6);

            _context.t4.use.call(_context.t4, _context.t7);

            server.use('/admin', _express2.default.static(_path2.default.join(__dirname, '..', 'admin', 'public'), { redirect: false }));

            // server.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => res.status(404).send('Cannot locate asset'))

            server.use(function (req, res) {
              return res.status(404).send('not found');
            });

            server.listen(3001, function () {
              (0, _console.info)('server', 'Starting appliction server');
            });

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function server() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = server;