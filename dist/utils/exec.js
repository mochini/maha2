'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = function exec(command, cwd) {
  return new _bluebird2.default(function (resolve, reject) {

    var parts = command.split(' ');

    var child = (0, _child_process.spawn)(parts[0], parts.slice(1), { cwd: cwd, stdio: 'inherit' });

    child.on('error', function (err) {
      return reject(err);
    });

    child.on('exit', function (data) {
      return resolve();
    });
  });
};

exports.default = exec;