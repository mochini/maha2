'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fixtures = require('../../objects/fixtures');

var _fixtures2 = _interopRequireDefault(_fixtures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var userFixtures = new _fixtures2.default({

  tableName: 'maha_users',

  records: [{
    id: 1,
    first_name: 'Greg',
    last_name: 'Kops',
    email: 'mochini@gmail.com'
  }]

});

var _default = userFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(userFixtures, 'userFixtures', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;