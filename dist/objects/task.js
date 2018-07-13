"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { writePaddedLine } from '../../utils/console'
// import Rollbar from '../../services/rollbar'
// import chalk from 'chalk'
// import path from 'path'

var task = function task(args) {

  var options = normalize(args);

  var source = require(options.file);

  var action = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _args = arguments;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return source[options.function].apply(source, _args);

            case 2:
              if (!options.exit) {
                _context.next = 5;
                break;
              }

              _context.next = 5;
              return process.exit();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function action() {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    command: options.command,
    alias: options.alias,
    description: options.description,
    action: action
  };
};

var normalize = function normalize(options) {
  return (0, _extends3.default)({
    exit: true
  }, options);
};

// const normalize = ({ command, description, alias, processor, env = true, exit = true, newline = true }) => {
//
//   return {
//
//     command,
//
//     description,
//
//     alias,
//
//     action: async (arg1, arg2, arg3) => {
//
//       try {
//
//         if(env) require(path.join(__dirname, '..', '..', 'services', 'environment.js'))
//
//         writePaddedLine(null, '', '#FFFFFF')
//
//         await processor(arg1, arg2, arg3)
//
//         if(newline) writePaddedLine(null, '', '#FFFFFF')
//
//         if(newline) process.stdout.write('\n')
//
//         if(exit) process.exit()
//
//       } catch(err) {
//
//         Rollbar.log(err.message)
//
//         console.log(chalk.red(err.message))
//
//         process.exit()
//
//       }
//
//     }
//
//   }
//
// }

exports.default = task;