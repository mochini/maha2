'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.git = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _console = require('../../utils/console');

var _exec = require('../../utils/exec');

var _exec2 = _interopRequireDefault(_exec);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var git = exports.git = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(flags, args) {
    return _regenerator2.default.wrap(function _callee$(_context) {
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
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(repo) {
    var repository, parts, name, destination;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
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