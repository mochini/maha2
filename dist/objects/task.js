'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _console = require('../../utils/console');

var _rollbar = require('../../services/rollbar');

var _rollbar2 = _interopRequireDefault(_rollbar);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var task = function task(options) {

  return normalize(options);
};

var normalize = function normalize(_ref) {
  var command = _ref.command,
      description = _ref.description,
      alias = _ref.alias,
      processor = _ref.processor,
      _ref$env = _ref.env,
      env = _ref$env === undefined ? true : _ref$env,
      _ref$exit = _ref.exit,
      exit = _ref$exit === undefined ? true : _ref$exit,
      _ref$newline = _ref.newline,
      newline = _ref$newline === undefined ? true : _ref$newline;


  return {

    command: command,

    description: description,

    alias: alias,

    action: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(arg1, arg2, arg3) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;


                if (env) require(_path2.default.join(__dirname, '..', '..', 'services', 'environment.js'));

                (0, _console.writePaddedLine)(null, '', '#FFFFFF');

                _context.next = 5;
                return processor(arg1, arg2, arg3);

              case 5:

                if (newline) (0, _console.writePaddedLine)(null, '', '#FFFFFF');

                if (newline) process.stdout.write('\n');

                if (exit) process.exit();

                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](0);


                _rollbar2.default.log(_context.t0.message);

                console.log(_chalk2.default.red(_context.t0.message));

                process.exit();

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 10]]);
      }));

      return function action(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()

  };
};

exports.default = task;