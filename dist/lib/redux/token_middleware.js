'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION_TYPES = ['API_REQUEST', 'SOCKETIO_JOIN', 'SOCKETIO_LEAVE', 'SOCKETIO_MESSAGE'];

var tokenMiddleware = function tokenMiddleware(store) {
  return function (next) {
    return function (action) {
      var _action$type$match = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/),
          _action$type$match2 = (0, _slicedToArray3.default)(_action$type$match, 3),
          type = _action$type$match2[2];

      if (!_lodash2.default.includes(ACTION_TYPES, type)) return next(action);

      var admin = store.getState().maha.admin;

      if (_lodash2.default.isNil(admin.teams) || _lodash2.default.isNil(admin.active)) return next(action);

      var team = admin.teams[admin.active];

      if (_lodash2.default.isNil(team)) return next(action);

      var token = action.token || team.token;

      next((0, _extends3.default)({}, action, {
        token: token,
        headers: (0, _extends3.default)({}, action.headers, {
          'Authorization': 'Bearer ' + token
        })
      }));
    };
  };
};

exports.default = tokenMiddleware;