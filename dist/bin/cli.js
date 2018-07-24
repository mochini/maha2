'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.help = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _console = require('../utils/console');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var help = exports.help = function help(command) {

  (0, _console.write)('\n');

  command ? helpCommand(command) : helpAll();

  (0, _console.write)('\n');

  process.exit();
};

var run = exports.run = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parsed) {
    var task, args;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
              return _extends({}, args, _defineProperty({}, arg.name, parsed.args[index] || null));
            }, {});
            _context.prev = 4;
            _context.next = 7;
            return task.action(parsed.flags, args);

          case 7:
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](4);


            console.log(_context.t0);

          case 12:
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

    return [].concat(_toConsumableArray(tasks), _toConsumableArray(_lodash2.default.castArray(namespaced)));
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
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var tasks;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(command) {
    var task, grammar;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(help, 'help', 'unknown');
  reactHotLoader.register(run, 'run', 'unknown');
  reactHotLoader.register(getTasks, 'getTasks', 'unknown');
  reactHotLoader.register(getTask, 'getTask', 'unknown');
  reactHotLoader.register(helpAll, 'helpAll', 'unknown');
  reactHotLoader.register(helpCommand, 'helpCommand', 'unknown');
  leaveModule(module);
})();

;