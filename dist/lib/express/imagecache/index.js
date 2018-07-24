'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _imagecachejs = require('imagecachejs');

var _imagecachejs2 = _interopRequireDefault(_imagecachejs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var imagecacheMiddleware = (0, _imagecachejs2.default)({
  webRoot: 'public',
  sources: _lodash2.default.uniq(_lodash2.default.compact([process.env.DATA_ASSET_HOST, process.env.WEB_ASSET_HOST, process.env.WEB_HOST]))
});

var _default = imagecacheMiddleware;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(imagecacheMiddleware, 'imagecacheMiddleware', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;