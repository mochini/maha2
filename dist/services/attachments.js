'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractAttachments = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _attachment = require('../models/attachment');

var _attachment2 = _interopRequireDefault(_attachment);

var _service = require('../models/service');

var _service2 = _interopRequireDefault(_service);

var _getUrls = require('get-urls');

var _getUrls2 = _interopRequireDefault(_getUrls);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _openGraph = require('open-graph');

var _openGraph2 = _interopRequireDefault(_openGraph);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ifaces = _os2.default.networkInterfaces();

var domains = ['localhost', 'dev.mahaplatform.com', process.env.DOMAIN].concat(_toConsumableArray(!_lodash2.default.isEmpty(process.env.DATA_ASSET_HOST) ? [_url2.default.parse(process.env.DATA_ASSET_HOST).hostname] : []), _toConsumableArray(!_lodash2.default.isEmpty(process.env.DATA_ASSET_CDN_HOST) ? [_url2.default.parse(process.env.DATA_ASSET_CDN_HOST).hostname] : []));

var localhosts = Object.keys(ifaces).reduce(function (ips, iface) {
  return [].concat(_toConsumableArray(ips), _toConsumableArray(ifaces[iface].map(function (adapter) {
    return adapter.address;
  })));
}, domains);

var download = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve, reject) {

              (0, _request2.default)({
                url: url,
                rejectUnauthorized: false,
                encoding: 'utf8',
                gzip: true,
                jar: true
              }, function (err, res, body) {

                if (err) return reject(err);

                return resolve(res);
              });
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

  return function download(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getMetaData = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, trx) {
    var uri, response, type;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uri = _url2.default.parse(url);

            if (!_lodash2.default.includes(localhosts, uri.hostname)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return', processLocalUrl(url, uri));

          case 3:
            _context2.next = 5;
            return download(url);

          case 5:
            response = _context2.sent;

            if (!(response.statusCode !== 200)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt('return', null);

          case 8:
            type = response.headers['content-type'].split('/')[0];

            if (!(type === 'image')) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt('return', processImageUrl(url, response));

          case 11:
            return _context2.abrupt('return', processOpenGraphUrl(uri, url, response, trx));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getMetaData(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var processLocalUrl = function processLocalUrl(url, uri) {

  var matches = uri.pathname.match(/assets\/(\d*)\/.*/);

  if (matches) return {
    type: 'asset',
    asset_id: matches[1],
    title_link: url
  };

  return processLocalPathname(uri.pathname);
};

var processLocalPathname = function processLocalPathname(pathname) {

  return {
    type: 'local',
    title_link: pathname
  };
};

var processImageUrl = function processImageUrl(url, response) {
  return {
    type: 'image',
    image_url: url
  };
};

var processOpenGraphUrl = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(uri, url, response, trx) {
    var meta, $, service;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            meta = _openGraph2.default.parse(response.body);
            $ = _cheerio2.default.load(response.body);
            _context3.next = 4;
            return getService($, url, trx);

          case 4:
            service = _context3.sent;

            if (!(Object.keys(meta).length > 0)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('return', _extends({
              service_id: service.get('id'),
              text: meta.description ? meta.description.substr(0, 255) : '',
              title: meta.title,
              title_link: meta.url,
              type: getType(meta)
            }, getImage(uri, meta.image), getVideo(uri, meta.video)));

          case 7:
            return _context3.abrupt('return', {
              service_id: service.get('id'),
              text: $('meta[name=description]').attr('content') || $('meta[name=Description]').attr('content') || '',
              title: $('title').eq(0).text(),
              title_link: url,
              type: 'link'
            });

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function processOpenGraphUrl(_x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var unpackOgArray = function unpackOgArray(value) {

  if (!value) return null;

  if (_lodash2.default.isArray(value)) return value[0];

  return value;
};

var getService = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4($, url, trx) {
    var uri, name, service, icons, href, icon;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            uri = _url2.default.parse(url);
            name = uri.hostname;
            _context4.next = 4;
            return _service2.default.where({ name: name }).fetch({ transacting: trx });

          case 4:
            service = _context4.sent;

            if (!service) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt('return', service);

          case 7:
            icons = [].concat(_toConsumableArray($('link[rel="icon"]').toArray()), _toConsumableArray($('link[rel="shortcut icon"]').toArray()), _toConsumableArray($('link[rel="Shortcut Icon"]').toArray()), _toConsumableArray($('link[rel="apple-touch-icon"]').toArray()), _toConsumableArray($('link[rel="image_src"]').toArray())).sort(function (a, b) {
              if (a.attribs.sizes > b.attribs.sizes) return -1;
              if (a.attribs.sizes < b.attribs.sizes) return 1;
              return 0;
            });
            href = icons.length > 0 ? icons[0].attribs.href : null;
            icon = href ? absoluteUrl(uri, href) : null;
            _context4.next = 12;
            return _service2.default.forge({ name: name, icon: icon }).save(null, { transacting: trx });

          case 12:
            return _context4.abrupt('return', _context4.sent);

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getService(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var getType = function getType(meta) {

  if (meta.type.match(/video/)) return 'video';

  return 'link';
};

var getImage = function getImage(uri, image) {

  if (!image) return {};

  var image_url = image.secure_url ? unpackOgArray(image.secure_url) : unpackOgArray(image.url);

  return {
    image_url: absoluteUrl(uri, image_url),
    image_width: unpackOgArray(image.width),
    image_height: unpackOgArray(image.height)
  };
};

var getVideo = function getVideo(uri, video) {

  if (!video) return {};

  var video_url = video.secure_url ? unpackOgArray(video.secure_url) : unpackOgArray(video.url);

  return {
    video_url: absoluteUrl(uri, video_url),
    video_width: unpackOgArray(video.width),
    video_height: unpackOgArray(video.height)
  };
};

var absoluteUrl = function absoluteUrl(uri, url) {

  return _url2.default.resolve(uri.protocol + '//' + uri.host + '/' + uri.pathname, url);
};

var createAttachment = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(attachable, index, url, trx) {
    var meta, data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getMetaData(url, trx);

          case 2:
            meta = _context5.sent;

            if (meta) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return', null);

          case 5:
            data = _extends({
              team_id: attachable.get('team_id'),
              attachable_type: attachable.tableName,
              attachable_id: attachable.get('id'),
              delta: index,
              from_url: url
            }, meta);
            _context5.next = 8;
            return _attachment2.default.forge(data).save(null, { transacting: trx });

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function createAttachment(_x11, _x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

var extractAttachments = exports.extractAttachments = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(attachable, text, trx) {
    var urls;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            urls = (0, _getUrls2.default)(text, {
              sortQueryParameters: false,
              removeTrailingSlash: true,
              stripWWW: false,
              stripFragment: false,
              normalizeProtocol: false
            });

            if (!(urls.size === 0)) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt('return');

          case 3:
            _context7.next = 5;
            return Promise.mapSeries(urls, function () {
              var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(url, index) {
                var normalizedUrl;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        normalizedUrl = normalizeUrl(text, url);
                        _context6.next = 3;
                        return createAttachment(attachable, index, normalizedUrl, trx);

                      case 3:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined);
              }));

              return function (_x18, _x19) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function extractAttachments(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

var normalizeUrl = function normalizeUrl(text, url) {

  var normalized = url.replace('?null', '');

  if (text.search(normalized) < 0) {
    normalized = normalized.replace(/\/+$/, '');
  }

  return normalized;
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ifaces, 'ifaces', 'unknown');
  reactHotLoader.register(domains, 'domains', 'unknown');
  reactHotLoader.register(localhosts, 'localhosts', 'unknown');
  reactHotLoader.register(download, 'download', 'unknown');
  reactHotLoader.register(getMetaData, 'getMetaData', 'unknown');
  reactHotLoader.register(processLocalUrl, 'processLocalUrl', 'unknown');
  reactHotLoader.register(processLocalPathname, 'processLocalPathname', 'unknown');
  reactHotLoader.register(processImageUrl, 'processImageUrl', 'unknown');
  reactHotLoader.register(processOpenGraphUrl, 'processOpenGraphUrl', 'unknown');
  reactHotLoader.register(unpackOgArray, 'unpackOgArray', 'unknown');
  reactHotLoader.register(getService, 'getService', 'unknown');
  reactHotLoader.register(getType, 'getType', 'unknown');
  reactHotLoader.register(getImage, 'getImage', 'unknown');
  reactHotLoader.register(getVideo, 'getVideo', 'unknown');
  reactHotLoader.register(absoluteUrl, 'absoluteUrl', 'unknown');
  reactHotLoader.register(createAttachment, 'createAttachment', 'unknown');
  reactHotLoader.register(extractAttachments, 'extractAttachments', 'unknown');
  reactHotLoader.register(normalizeUrl, 'normalizeUrl', 'unknown');
  leaveModule(module);
})();

;