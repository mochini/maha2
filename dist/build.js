'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = undefined;

var _console = require('./utils/console');

var _babelCore = require('babel-core');

var _moveConcurrently = require('move-concurrently');

var _moveConcurrently2 = _interopRequireDefault(_moveConcurrently);

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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
  return [getItem(src, root, item)].concat(_toConsumableArray(_fs2.default.lstatSync(src).isDirectory() ? listItems(src) : []));
};

var listItems = function listItems(root) {
  return _fs2.default.readdirSync(root).reduce(function (items, item) {
    return [].concat(_toConsumableArray(items), _toConsumableArray(listContents(_path2.default.join(root, item), root, item)));
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

  return Promise.promisify(_ncp2.default)(src, dest);
};

var buildItem = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item, srcPath, destPath) {
    var dest;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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

var buildItems = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(srcPath, destPath) {
    var items;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            items = listItems(srcPath);
            _context2.next = 3;
            return Promise.mapSeries(items, function (item) {
              return buildItem(item, srcPath, destPath);
            });

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function buildItems(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var build = exports.build = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(flags, args) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _rimraf2.default.sync(_path2.default.resolve('dist.staged'));

          case 2:
            _context3.next = 4;
            return buildItems(_path2.default.resolve('src'), _path2.default.resolve('dist.staged'));

          case 4:
            _context3.next = 6;
            return _rimraf2.default.sync(_path2.default.resolve('dist'));

          case 6:
            _context3.next = 8;
            return (0, _moveConcurrently2.default)(_path2.default.resolve('dist.staged'), _path2.default.resolve('dist'));

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function build(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

build();
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getItemType, 'getItemType', 'unknown');
  reactHotLoader.register(getItem, 'getItem', 'unknown');
  reactHotLoader.register(listContents, 'listContents', 'unknown');
  reactHotLoader.register(listItems, 'listItems', 'unknown');
  reactHotLoader.register(transpile, 'transpile', 'unknown');
  reactHotLoader.register(mkdir, 'mkdir', 'unknown');
  reactHotLoader.register(copy, 'copy', 'unknown');
  reactHotLoader.register(buildItem, 'buildItem', 'unknown');
  reactHotLoader.register(buildItems, 'buildItems', 'unknown');
  reactHotLoader.register(build, 'build', 'unknown');
  leaveModule(module);
})();

;