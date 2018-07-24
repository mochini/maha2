'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var paths = [_path2.default.resolve('.env'), _path2.default.resolve('config', process.env.NODE_ENV + '.env'), _path2.default.resolve('..', 'mahaplatform.com', '.env')];

var envPath = paths.reduce(function (envPath, path) {
  return envPath || (_fs2.default.existsSync(path) ? path : null);
}, null);

if (!envPath) {
  console.log(_chalk2.default.cyan('THE MAHA PLATFORM'));
  console.log('You have not yet configured your environment. Please run `maha env:setup` to set it up.');
  process.exit();
}

_dotenv2.default.load({ path: envPath });
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(paths, 'paths', 'unknown');
  reactHotLoader.register(envPath, 'envPath', 'unknown');
  leaveModule(module);
})();

;