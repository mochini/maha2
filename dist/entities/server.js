'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domain = require('../lib/express/domain');

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

var server = function server() {

  var server = (0, _express2.default)();

  server.use('/ping', _ping2.default);

  server.use('/jobs', _toureiro2.default);

  server.use('/imagecache', _imagecache2.default);

  // server.use(emailMiddleware)
  //
  // server.use(mailboxMiddleware)
  //
  // router.use(await helpMiddleware())
  //
  // server.use(adminDomainMiddleware(await adminMiddleware()))
  //
  // server.use(publicDomainMiddleware(await publicMiddleware()))

  server.use('/admin', _express2.default.static(_path2.default.join(__dirname, '..', 'admin', 'public'), { redirect: false }));

  // server.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => res.status(404).send('Cannot locate asset'))

  server.use(function (req, res) {
    return res.status(404).send('not found');
  });

  server.listen(3001, function () {
    (0, _console.info)('server', 'Listening on 3001');
  });
};

exports.default = server;