'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var contactFixtures = new _maha.Fixtures({

  tableName: 'foo_contacts',

  records: [{
    id: 1,
    first_name: 'Greg',
    last_name: 'Kops',
    email: 'mochini@gmail.com'
  }]

});

exports.default = contactFixtures;