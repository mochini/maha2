'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _console = require('../../utils/console');

var _babelCore = require('babel-core');

var _webpack = require('./webpack.config');

var _webpack2 = _interopRequireDefault(_webpack);

var _moveConcurrently = require('move-concurrently');

var _moveConcurrently2 = _interopRequireDefault(_moveConcurrently);

var _webpack3 = require('webpack');

var _webpack4 = _interopRequireDefault(_webpack3);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ncp = require('ncp');

var _ncp2 = _interopRequireDefault(_ncp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = _path2.default.resolve(__dirname, '..', '..', 'admin');

var getItemType = function getItemType(item) {
  return item.match(/([^.]*)\.?(.*)?/)[2] || 'dir';
};

var getItem = function getItem(src, root, item) {
  return {
    src: src,
    type: getItemType(item)
  };
};

var listContents = function listContents(src, root, item) {
  return [getItem(src, root, item)].concat((0, _toConsumableArray3.default)(_fs2.default.lstatSync(src).isDirectory() ? listItems(src) : []));
};

var listItems = function listItems(root) {
  return _fs2.default.readdirSync(root).reduce(function (items, item) {
    return [].concat((0, _toConsumableArray3.default)(items), (0, _toConsumableArray3.default)(listContents(_path2.default.join(root, item), root, item)));
  }, []);
};

var transpile = function transpile(src, dest) {

  (0, _console.action)('compile', src);

  var contents = _fs2.default.readFileSync(src, 'utf8');

  var transpiled = (0, _babelCore.transform)(contents, {
    presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-0'],
    plugins: ['react-hot-loader/babel']
  });

  _fs2.default.writeFileSync(dest, transpiled.code);
};

var mkdir = function mkdir(src, dest) {

  (0, _console.action)('mkdir', src);

  _mkdirp2.default.sync(dest);
};

var copy = function copy(src, dest) {

  (0, _console.action)('copy', src);

  return (0, _bluebird.promisify)(_ncp2.default)(src, dest);
};

var buildItem = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item, srcPath, destPath) {
    var dest;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dest = item.src.replace(srcPath, destPath);

            if (!(item.type === 'js')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', transpile(item.src, dest));

          case 3:
            if (!(item.type === 'dir')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', mkdir(item.src, dest));

          case 5:
            _context.next = 7;
            return copy(item.src, dest);

          case 7:
            return _context.abrupt('return', _context.sent);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function buildItem(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var removeBuild = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dest) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _rimraf2.default.sync(dest));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function removeBuild(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var copyAssets = function copyAssets(src, dest) {
  return (0, _bluebird.promisify)(_ncp2.default)(src, dest);
};

var buildItems = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(srcPath, destPath) {
    var items;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            items = listItems(srcPath);
            _context3.next = 3;
            return (0, _bluebird.mapSeries)(items, function (item) {
              return buildItem(item, srcPath, destPath);
            });

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function buildItems(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var compile = function compile(name, base) {
  return new _bluebird2.default(function (resolve, reject) {

    (0, _webpack4.default)((0, _webpack2.default)(name, base)).run(function (err, stats) {

      if (err) reject(err);

      resolve(stats);
    });
  });
};

var buildPublic = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(name, base) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _mkdirp2.default.sync(_path2.default.join('build', 'public', name));

          case 2:
            _context4.next = 4;
            return copyAssets(_path2.default.join(base, 'public'), _path2.default.join('build', 'public', name));

          case 4:
            _context4.next = 6;
            return compile(name, base);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function buildPublic(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var build = exports.build = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return removeBuild(_path2.default.join('build'));

          case 2:
            _context6.next = 4;
            return buildItems(_path2.default.join('apps'), _path2.default.join('build', 'apps'));

          case 4:
            _context6.next = 6;
            return buildPublic('admin', _path2.default.resolve('node_modules', 'maha', 'src', 'admin'));

          case 6:
            _context6.next = 8;
            return (0, _bluebird.map)(_fs2.default.readdirSync(_path2.default.join('apps')), function () {
              var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(app, index) {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return buildPublic(app, _path2.default.resolve('apps', app, 'public'));

                      case 2:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x9, _x10) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function build() {
    return _ref5.apply(this, arguments);
  };
}();