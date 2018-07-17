'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var scriptPath = _path2.default.join(rootPath, 'index.js');

var MahaScriptPlugin = function () {
  function MahaScriptPlugin() {
    (0, _classCallCheck3.default)(this, MahaScriptPlugin);
  }

  (0, _createClass3.default)(MahaScriptPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      var compile = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var scripts, reducers, routes, badges, userTasks, userFields, userValues, template, data;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(file && !file.match(/^.*\.js$/))) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return');

                case 2:

                  if (file) (0, _console.log)('wdm', 'Detected change in ' + file.replace(rootPath + '/', ''));

                  scripts = _glob2.default.sync('packages/**/src/admin/ui/**/*.js');
                  reducers = [];
                  routes = [];
                  badges = [];
                  userTasks = [];
                  userFields = [];
                  userValues = [];
                  template = _fs2.default.readFileSync(_path2.default.join(__dirname, 'index.js.ejs'), 'utf8');
                  data = _ejs2.default.render(template, { reducers: reducers, routes: routes, badges: badges, userTasks: userTasks, userFields: userFields, userValues: userValues });


                  _fs2.default.writeFileSync(scriptPath, data, 'utf8');

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function compile() {
          return _ref.apply(this, arguments);
        };
      }();

      compiler.hooks.afterEnvironment.tap('MahaScriptPlugin', compile);

      compiler.hooks.invalid.tap('MahaScriptPlugin', compile);
    }
  }]);
  return MahaScriptPlugin;
}();

exports.default = MahaScriptPlugin;