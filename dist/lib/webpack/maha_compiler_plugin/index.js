'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rootPath = _path2.default.resolve();

var MahaCompilerPlugin = function () {
  function MahaCompilerPlugin(name) {
    _classCallCheck(this, MahaCompilerPlugin);

    this.name = name;
  }

  _createClass(MahaCompilerPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      var compileScripts = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var reducers, routes, badges, userTasks, userFields, userValues, template, data;
          return regeneratorRuntime.wrap(function _callee$(_context) {
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

                  reducers = [].concat(_toConsumableArray(_glob2.default.sync('packages/**/reducer.js')), _toConsumableArray(_glob2.default.sync('apps/*/admin/ui/components/reducer.js'))).map(function (file) {
                    return {
                      module: file.split('/')[1],
                      name: file.match(/([\w_]*)\/reducer.js$/)[1],
                      filepath: file.match(/^(.*)\/reducer.js$/)[1]
                    };
                  });
                  routes = [].concat(_toConsumableArray(_glob2.default.sync('apps/*/admin/ui/routes.js'))).map(function (filepath) {
                    return {
                      name: filepath.match(/([\w_]*)\/admin\/ui\/routes.js$/)[1],
                      filepath: filepath
                    };
                  });
                  badges = [].concat(_toConsumableArray(_glob2.default.sync('apps/*/admin/ui/badges.js'))).map(function (filepath) {
                    return {
                      name: filepath.match(/([\w_]*)\/admin\/ui\/badges.js$/)[1],
                      filepath: filepath
                    };
                  });
                  userTasks = [].concat(_toConsumableArray(_glob2.default.sync('apps/*/admin/ui/user_tasks.js'))).map(function (filepath) {
                    return {
                      name: filepath.match(/([\w_]*)\/admin\/ui\/user_tasks.js$/)[1],
                      filepath: filepath
                    };
                  });
                  userFields = [].concat(_toConsumableArray(_glob2.default.sync('apps/*/admin/ui/user_fields.js'))).map(function (filepath) {
                    return {
                      name: filepath.match(/([\w_]*)\/admin\/ui\/user_fields.js$/)[1],
                      filepath: filepath
                    };
                  });
                  userValues = [].concat(_toConsumableArray(_glob2.default.sync('apps/*/admin/ui/user_values.js'))).map(function (filepath) {
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

        var styles = [].concat(_toConsumableArray(_glob2.default.sync('packages/**/style.less')), _toConsumableArray(_glob2.default.sync('apps/*/admin/**/style.less'))).map(function (style) {
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
  }, {
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return MahaCompilerPlugin;
}();

var _default = MahaCompilerPlugin;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rootPath, 'rootPath', 'unknown');
  reactHotLoader.register(MahaCompilerPlugin, 'MahaCompilerPlugin', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;