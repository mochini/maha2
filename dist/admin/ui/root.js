'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _authentication_middleware = require('../../lib/redux/authentication_middleware');

var _authentication_middleware2 = _interopRequireDefault(_authentication_middleware);

var _fingerprint_middleware = require('../../lib/redux/fingerprint_middleware');

var _fingerprint_middleware2 = _interopRequireDefault(_fingerprint_middleware);

var _token_middleware = require('../../lib/redux/token_middleware');

var _token_middleware2 = _interopRequireDefault(_token_middleware);

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import createSocketioClient from 'redux-socketio-client'
var Root = function (_React$Component) {
  (0, _inherits3.default)(Root, _React$Component);

  function Root(props) {
    (0, _classCallCheck3.default)(this, Root);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

    _this.store = _this._getStore();
    return _this;
  }

  (0, _createClass3.default)(Root, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: this.store },
        this.props.children
      );
    }
  }, {
    key: '_getStore',
    value: function _getStore() {
      // const reducer = combineReducers([
      // ...Object.values(Reframe),
      // ...this.props.reducers
      // ])
      var reducer = function reducer(state, action) {
        return state;
      };

      // const socketUrl = `${window.location.protocol}//${window.location.hostname}:${process.env.SOCKET_PORT}`

      var loggerMiddleware = (0, _reduxLogger.createLogger)({ collapsed: true });

      // const apiRequestMiddleware = createApiRequest()

      // const socketioClientMiddleware = createSocketioClient({ url: socketUrl })

      // const localStorageMiddleware = createlocalStorage()

      var middleware = [_reduxThunk2.default, _token_middleware2.default, _fingerprint_middleware2.default,
      // apiRequestMiddleware,
      // socketioClientMiddleware,
      // localStorageMiddleware,
      _authentication_middleware2.default].concat((0, _toConsumableArray3.default)(process.env.NODE_ENV !== 'production' ? [loggerMiddleware] : []));

      var createStoreWithMiddleware = _redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middleware))(_redux.createStore);

      return createStoreWithMiddleware(reducer);
    }
  }]);
  return Root;
}(_react2.default.Component);
// import Reframe from 'reframe'

// import createlocalStorage from 'redux-local-storage'
// import { combineReducers } from 'redux-rubberstamp'
// import createApiRequest from 'redux-api-request'


Root.propTypes = {
  reducers: _propTypes2.default.array,
  children: _propTypes2.default.any
};
exports.default = Root;