#!/usr/bin/env babel-node
'use strict';

var _babelRegister = require('babel-register');

var _babelRegister2 = _interopRequireDefault(_babelRegister);

var _cli = require('./cli');

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import '../lib/environment'


(0, _babelRegister2.default)({
  presets: ['es2015', 'react', 'stage-0'],
  plugins: ['transform-promise-to-bluebird', ['transform-runtime', { polyfill: false }]]
});

var parse = function parse(args) {

  var argv = (0, _minimist2.default)(args);

  return {
    command: argv._[0],
    args: argv._.slice(1),
    help: argv.help !== undefined,
    flags: _lodash2.default.omit(argv, ['help', '_'])
  };
};

var execute = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(argv) {
    var parsed;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            parsed = parse(argv);

            if (!(parsed.help || !parsed.command)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', (0, _cli.help)(parsed.command));

          case 3:
            _context.next = 5;
            return (0, _cli.run)(parsed);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function execute(_x) {
    return _ref.apply(this, arguments);
  };
}();

execute(process.argv.slice(2));
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(parse, 'parse', 'unknown');
  reactHotLoader.register(execute, 'execute', 'unknown');
  leaveModule(module);
})();

;