'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.generate = undefined;

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _console = require('../../utils/console');

var _exec = require('../../utils/exec');

var _exec2 = _interopRequireDefault(_exec);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _ncp = require('ncp');

var _ncp2 = _interopRequireDefault(_ncp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generatorsPath = _path2.default.join(__dirname, '..', '..', 'generators');

var generators = _fs2.default.readdirSync(generatorsPath);

var generate = exports.generate = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(flags, args) {
    var template, app, name, config, data, generatorPath, generator;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            template = args.template;
            app = args.app;
            name = typeof args.name === 'string' ? args.name : args.app;

            if (_lodash2.default.includes(generators, template)) {
              _context2.next = 5;
              break;
            }

            throw new Error('\'' + template + '\' is not a valid template');

          case 5:
            config = getConfig(app);
            data = getData(template, app, config, name);
            generatorPath = _path2.default.join(generatorsPath, template);
            generator = require(generatorPath).default;
            _context2.next = 11;
            return (0, _bluebird.mapSeries)(generator.files, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return generateFile(file, generatorPath, data);

                      case 2:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 11:
            if (!generator.after) {
              _context2.next = 14;
              break;
            }

            _context2.next = 14;
            return runHooks(generator.after, data);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function generate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var destroy = exports.destroy = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var template,
        app,
        name,
        _args3 = arguments;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            template = _args3.length <= 0 ? undefined : _args3[0];
            app = _args3.length <= 1 ? undefined : _args3[1];
            name = typeof (_args3.length <= 2 ? undefined : _args3[2]) === 'string' ? _args3.length <= 2 ? undefined : _args3[2] : _args3.length <= 1 ? undefined : _args3[1];


            console.log('destroy ' + template + ' ' + app + ' ' + name);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function destroy() {
    return _ref3.apply(this, arguments);
  };
}();

var generateFile = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(file, templatesPath, data) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(file.action === 'copy')) {
              _context4.next = 4;
              break;
            }

            _context4.next = 3;
            return copyItem(file, templatesPath, data);

          case 3:
            return _context4.abrupt('return', _context4.sent);

          case 4:
            if (!(file.action === 'create')) {
              _context4.next = 8;
              break;
            }

            _context4.next = 7;
            return createFile(file, templatesPath, data);

          case 7:
            return _context4.abrupt('return', _context4.sent);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function generateFile(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var makeDirectory = function makeDirectory(filepath, data) {

  _path2.default.dirname(filepath).split('/').reduce(function (fullPath, segment) {

    var joinedPath = _path2.default.join(fullPath, segment);

    if (_fs2.default.existsSync(joinedPath)) return joinedPath;

    (0, _console.action)('mkdir', joinedPath);

    _fs2.default.mkdirSync(joinedPath);

    return joinedPath;
  }, '');
};

var copyItem = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(file, templatesPath, data) {
    var srcPath, destPath;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            srcPath = _ejs2.default.render(_path2.default.join(templatesPath, file.src), data);
            destPath = _ejs2.default.render(_path2.default.join(file.dest), data);


            (0, _console.action)('copy', destPath);

            _context5.next = 5;
            return (0, _bluebird.promisify)(_ncp2.default)(_path2.default.resolve(srcPath), _path2.default.resolve(destPath));

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function copyItem(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var createFile = function createFile(file, templatesPath, data) {

  var renderedPath = _ejs2.default.render(file.filepath, data);

  var filepath = _path2.default.join(data.root, renderedPath);

  makeDirectory(filepath, data);

  if (_fs2.default.existsSync(filepath)) return (0, _console.action)('identical', filepath);

  var rendered = getRendered(file, templatesPath, data);

  (0, _console.action)('create', filepath);

  _fs2.default.writeFileSync(filepath, rendered);
};

var getConfig = function getConfig(app) {

  var appConfigFilePath = _path2.default.resolve('apps', app, 'app.js');

  return _fs2.default.existsSync(appConfigFilePath) ? require(appConfigFilePath).default.config : null;
};

var getData = function getData(template, app, config, initname) {

  var parts = initname.split('/').map(_lodash2.default.snakeCase);

  var name = parts[parts.length - 1];

  var app_name = _lodash2.default.includes(['platform', 'app'], template) ? _lodash2.default.kebabCase(name) : config.title;

  return {
    _: _lodash2.default,
    pluralize: _pluralize2.default,
    moment: _moment2.default,
    app: app,
    name: name,
    app_name: app_name,
    root: '',
    path: parts.join('/')
  };
};

var getRendered = function getRendered(file, templatesPath, data) {

  if (file.template) {

    var templateFilePath = _path2.default.join(templatesPath, file.template);

    var template = _fs2.default.readFileSync(templateFilePath, 'utf8');

    return _ejs2.default.render(template, data);
  }

  if (file.content) return _ejs2.default.render(file.content, data);

  return '';
};

var runHooks = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(hooks, data) {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _bluebird.mapSeries)(hooks, function () {
              var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(hook) {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:

                        (0, _console.action)('exec', hook.description);

                        _context6.next = 3;
                        return (0, _exec2.default)(hook.command, data.path);

                      case 3:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined);
              }));

              return function (_x12) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 2:
            return _context7.abrupt('return', _context7.sent);

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function runHooks(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

exports.default = generate;