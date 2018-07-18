'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _imagecachejs = require('imagecachejs');

var _imagecachejs2 = _interopRequireDefault(_imagecachejs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imagecacheMiddleware = (0, _imagecachejs2.default)({
  webRoot: 'public',
  sources: _lodash2.default.uniq(_lodash2.default.compact([process.env.DATA_ASSET_HOST, process.env.WEB_ASSET_HOST, process.env.WEB_HOST]))
});

exports.default = imagecacheMiddleware;