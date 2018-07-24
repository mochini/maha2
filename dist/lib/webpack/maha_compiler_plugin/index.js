'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var MahaCompilerPlugin = function () {
  function MahaCompilerPlugin(name) {
    (0, _classCallCheck3.default)(this, MahaCompilerPlugin);

    this.name = name;
  }

  (0, _createClass3.default)(MahaCompilerPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      var compileScripts = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var reducers, routes, badges, userTasks, userFields, userValues, template, data;
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

                  if (file) (0, _console.info)(_this.name, 'Detected change in ' + file.replace(rootPath + '/', ''));

                  reducers = [].concat((0, _toConsumableArray3.default)(_glob2.default.sync('packages/**/reducer.js')), (0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/admin/ui/components/reducer.js'))).map(function (file) {
                    return {
                      module: file.split('/')[1],
                      name: file.match(/([\w_]*)\/reducer.js$/)[1],
                      filepath: file.match(/^(.*)\/reducer.js$/)[1]
                    };
                  });
                  routes = [].concat((0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/admin/ui/routes.js'))).map(function (filepath) {
                    return {
                      name: filepath.match(/([\w_]*)\/admin\/ui\/routes.js$/)[1],
                      filepath: filepath
                    };
                  });
                  badges = [].concat((0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/admin/ui/badges.js'))).map(function (filepath) {
                    return {
                      name: filepath.match(/([\w_]*)\/admin\/ui\/badges.js$/)[1],
                      filepath: filepath
                    };
                  });
                  userTasks = [].concat((0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/admin/ui/user_tasks.js'))).map(function (filepath) {
                    return {
                      name: filepath.match(/([\w_]*)\/admin\/ui\/user_tasks.js$/)[1],
                      filepath: filepath
                    };
                  });
                  userFields = [].concat((0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/admin/ui/user_fields.js'))).map(function (filepath) {
                    return {
                      name: filepath.match(/([\w_]*)\/admin\/ui\/user_fields.js$/)[1],
                      filepath: filepath
                    };
                  });
                  userValues = [].concat((0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/admin/ui/user_values.js'))).map(function (filepath) {
                    return {
                      name: filepath.match(/([\w_]*)\/admin\/ui\/user_values.js$/)[1],
                      filepath: filepath
                    };
                  });
                  template = _fs2.default.readFileSync(_path2.default.join(__dirname, 'index.js.ejs'), 'utf8');
                  data = _ejs2.default.render(template, { reducers: reducers, routes: routes, badges: badges, userTasks: userTasks, userFields: userFields, userValues: userValues });


                  _fs2.default.writeFileSync(_path2.default.join(rootPath, 'build', _this.name + '.js'), data, 'utf8');

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function compileScripts() {
          return _ref.apply(this, arguments);
        };
      }();

      var compileStyles = function compileStyles(file) {

        if (file && !file.match(/^.*\.less/)) return;

        if (file) (0, _console.info)(_this.name, 'Detected change in ' + file.replace(rootPath + '/', ''));

        var styles = [].concat((0, _toConsumableArray3.default)(_glob2.default.sync('packages/**/style.less')), (0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/admin/**/style.less'))).map(function (style) {
          return _path2.default.resolve(style);
        });

        var template = _fs2.default.readFileSync(_path2.default.join(__dirname, 'index.less.ejs'), 'utf8');

        var data = _ejs2.default.render(template, { styles: styles });

        _fs2.default.writeFileSync(_path2.default.join(rootPath, 'build', _this.name + '.less'), data, 'utf8');
      };

      compiler.hooks.environment.tap('MahaCompilerPlugin', function () {
        return (0, _console.info)(_this.name, 'Compiling UI...');
      });

      compiler.hooks.afterEnvironment.tap('MahaCompilerPlugin', compileScripts);

      compiler.hooks.afterEnvironment.tap('MahaCompilerPlugin', compileStyles);

      compiler.hooks.invalid.tap('MahaCompilerPlugin', compileScripts);

      compiler.hooks.invalid.tap('MahaCompilerPlugin', compileStyles);

      compiler.hooks.done.tap('MahaCompilerPlugin', function () {
        return (0, _console.info)(_this.name, 'Finished compiling UI');
      });
    }
  }]);
  return MahaCompilerPlugin;
}();

exports.default = MahaCompilerPlugin;