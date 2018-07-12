'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticationMiddleware = function authenticationMiddleware(store) {
  return function (next) {
    return function (action) {
      var _action$type$match = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/),
          _action$type$match2 = (0, _slicedToArray3.default)(_action$type$match, 3),
          type = _action$type$match2[2];

      if (type !== 'API_UNAUTHENTICATED') return next(action);

      var admin = store.getState().maha.admin;

      if (admin.teams === null || admin.active === null) return next(action);

      store.dispatch({
        type: 'maha.admin/REMOVE_TEAM',
        index: admin.active
      });

      store.dispatch({
        type: 'reframe.flash/SET',
        style: 'info',
        message: 'Your session has unexpectedly expired'
      });
    };
  };
};

exports.default = authenticationMiddleware;