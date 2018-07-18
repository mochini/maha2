#!/usr/bin/env babel-node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _babelRegister = require('babel-register');

var _babelRegister2 = _interopRequireDefault(_babelRegister);

var _cli = require('./cli');

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(argv) {
    var parsed;
    return _regenerator2.default.wrap(function _callee$(_context) {
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