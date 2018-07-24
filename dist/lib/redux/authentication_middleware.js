'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var authenticationMiddleware = function authenticationMiddleware(store) {
  return function (next) {
    return function (action) {
      var _action$type$match = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/),
          _action$type$match2 = _slicedToArray(_action$type$match, 3),
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

var _default = authenticationMiddleware;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(authenticationMiddleware, 'authenticationMiddleware', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;