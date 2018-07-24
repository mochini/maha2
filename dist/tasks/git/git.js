'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.git = undefined;

var _console = require('../../utils/console');

var _exec = require('../../utils/exec');

var _exec2 = _interopRequireDefault(_exec);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var git = exports.git = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(flags, args) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(args.action === 'clone')) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return _clonePackage(args.repository);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function git(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _getRepository = function _getRepository(name) {

  if (name.match(/^https:\/\/github\.com\/.*\.git$/)) return name;

  if (name.match(/^[\w\d-]*\/[\w\d-]*$/)) return 'https://github.com/' + name + '.git';

  return 'https://github.com/mahaplatform/' + name + '.git';
};

var _clonePackage = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(repo) {
    var repository, parts, name, destination;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            repository = _getRepository(repo);


            (0, _console.action)('clone', repository);

            parts = repository.match(/\/([\w\d-]*)\.git/);

            if (parts) {
              _context2.next = 5;
              break;
            }

            throw new Error('Unable to clone ' + repository);

          case 5:
            name = parts[1];
            destination = _path2.default.join('apps', name);

            if (!_fs2.default.existsSync(destination)) {
              _context2.next = 9;
              break;
            }

            throw new Error(repository + ' already cloned');

          case 9:
            _context2.next = 11;
            return (0, _exec2.default)('git clone ' + repository, _path2.default.resolve('apps'));

          case 11:
            return _context2.abrupt('return', name);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function _clonePackage(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(git, 'git', 'unknown');
  reactHotLoader.register(_getRepository, '_getRepository', 'unknown');
  reactHotLoader.register(_clonePackage, '_clonePackage', 'unknown');
  leaveModule(module);
})();

;