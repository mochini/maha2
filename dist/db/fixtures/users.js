'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fixtures = require('../../objects/fixtures');

var _fixtures2 = _interopRequireDefault(_fixtures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userFixtures = new _fixtures2.default({

  tableName: 'foo_contacts',

  records: [{
    id: 1,
    first_name: 'Greg',
    last_name: 'Kops',
    email: 'mochini@gmail.com'
  }]

});

exports.default = userFixtures;