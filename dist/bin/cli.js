'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.help = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _console = require('../utils/console');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var help = exports.help = function help(command) {

  (0, _console.write)('\n');

  command ? helpCommand(command) : helpAll();

  (0, _console.write)('\n');

  process.exit();
};

var run = exports.run = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parsed) {
    var task, args;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            task = getTask(parsed.command);

            if (task) {
              _context.next = 3;
              break;
            }

            throw new Error('invalid script');

          case 3:
            args = task.args.reduce(function (args, arg, index) {
              return (0, _extends4.default)({}, args, (0, _defineProperty3.default)({}, arg.name, parsed.args[index] || null));
            }, {});
            _context.prev = 4;
            _context.next = 7;
            return task.action(parsed.flags, args);

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](4);


            (0, _console.write)({ color: 'red', content: _context.t0.message });

            process.exit();

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 9]]);
  }));

  return function run(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getTasks = function getTasks() {

  var taskRoot = _path2.default.resolve(__dirname, '..', 'tasks');

  var taskFiles = _fs2.default.readdirSync(taskRoot);

  return taskFiles.reduce(function (tasks, taskFile) {

    var namespaced = require(_path2.default.join(taskRoot, taskFile)).default;

    return [].concat((0, _toConsumableArray3.default)(tasks), (0, _toConsumableArray3.default)(_lodash2.default.castArray(namespaced)));
  }, []);
};

var getTask = function getTask(command) {

  var tasks = getTasks();

  var named = _lodash2.default.find(tasks, { command: command });

  if (named) return named;

  var aliased = _lodash2.default.find(tasks, { alias: command });

  if (aliased) return aliased;

  return null;
};

var helpAll = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var tasks;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tasks = getTasks();


            (0, _console.write)([{ color: 'green', length: 15, content: 'Usage: ' }, { color: 'white', content: 'maha [COMMAND] [FLAGS] [ARGS]' }]);

            (0, _console.write)([{ color: 'green', length: 15, content: 'Description: ' }, { color: 'white', content: 'Tool for running maha tasks' }]);

            (0, _console.write)('\nCOMMANDS:\n\n');

            tasks.map(function (task) {
              return (0, _console.write)([{ color: 'green', length: 25, content: 'maha ' + task.command }, { color: 'white', content: '# ' + task.description }]);
            });

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function helpAll() {
    return _ref2.apply(this, arguments);
  };
}();

var helpCommand = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(command) {
    var task, grammar;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            task = getTask(command);
            grammar = task.command;


            if (task.flags.length) grammar += task.flags.map(function (flag) {
              return ' [--' + flag.name + ']';
            }).join('');

            if (task.args.length) grammar += task.args.map(function (arg) {
              return ' <' + arg.name + '>';
            }).join('');

            (0, _console.write)([{ color: 'green', length: 15, content: 'Usage:' }, { color: 'white', content: 'maha ' + grammar }]);

            if (task.alias) {

              (0, _console.write)([{ color: 'green', length: 15, content: 'Alias:' }, { color: 'white', content: 'maha ' + task.alias }]);
            }

            (0, _console.write)([{ color: 'green', length: 15, content: 'Description:' }, { color: 'white', content: task.description }]);

            if (task.flags.length) {

              (0, _console.write)('\nFLAGS:\n\n');

              task.flags.map(function (flag) {
                return (0, _console.write)([{ color: 'green', length: 15, content: '--' + flag.name }, { color: 'white', content: flag.description }]);
              });
            }

            if (task.args) {

              (0, _console.write)('\nARGS:\n\n');

              task.args.map(function (arg) {
                return (0, _console.write)([{ color: 'green', length: 15, content: '<' + arg.name + '>' }, { color: 'white', content: arg.description }]);
              });
            }

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function helpCommand(_x2) {
    return _ref3.apply(this, arguments);
  };
}();