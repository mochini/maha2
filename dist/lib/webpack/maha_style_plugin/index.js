'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _console = require('../../../utils/console');

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootPath = _path2.default.resolve();

var stylePath = _path2.default.join(rootPath, 'index.less');

var MahaStylePlugin = function () {
  function MahaStylePlugin() {
    (0, _classCallCheck3.default)(this, MahaStylePlugin);
  }

  (0, _createClass3.default)(MahaStylePlugin, [{
    key: 'apply',
    value: function apply(compiler) {

      var create = function create(file) {

        if (file && !file.match(/^.*\.less/)) return;

        if (file) (0, _console.log)('wdm', 'Detected change in ' + file.replace(rootPath + '/', ''));

        var styles = _glob2.default.sync('apps/**/admin/ui/**/style.less').map(function (style) {
          return _path2.default.resolve(style);
        });

        var template = _fs2.default.readFileSync(_path2.default.join(__dirname, 'index.less.ejs'), 'utf8');

        var data = _ejs2.default.render(template, { styles: styles });

        _fs2.default.writeFileSync(stylePath, data, 'utf8');
      };

      compiler.hooks.afterEnvironment.tap('MahaStylePlugin', create);

      compiler.hooks.invalid.tap('MahaStylePlugin', create);
    }
  }]);
  return MahaStylePlugin;
}();

exports.default = MahaStylePlugin;