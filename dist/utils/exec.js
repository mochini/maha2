'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var exec = function exec(command, cwd) {
  return new Promise(function (resolve, reject) {

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

var _default = exec;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(exec, 'exec', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;