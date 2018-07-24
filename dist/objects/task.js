"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { writePaddedLine } from '../../utils/console'
// import Rollbar from '../../services/rollbar'
// import chalk from 'chalk'
// import path from 'path'

var task = function task(args) {

  var options = normalize(args);

  var action = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var source,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              source = require(options.file);
              _context.next = 3;
              return source[options.function].apply(source, _args);

            case 3:
              if (!options.exit) {
                _context.next = 6;
                break;
              }

              _context.next = 6;
              return process.exit();

            case 6:
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
    flags: options.flags || [],
    args: options.args || [],
    action: action
  };
};

var normalize = function normalize(options) {
  return _extends({
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

var _default = task;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(task, "task", "unknown");
  reactHotLoader.register(normalize, "normalize", "unknown");
  reactHotLoader.register(_default, "default", "unknown");
  leaveModule(module);
})();

;