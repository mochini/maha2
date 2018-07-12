'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _reactFastclick = require('react-fastclick');

var _reactFastclick2 = _interopRequireDefault(_reactFastclick);

var _reactHotLoader = require('react-hot-loader');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactFastclick2.default)();

var Platform = function (_React$Component) {
  (0, _inherits3.default)(Platform, _React$Component);

  function Platform() {
    (0, _classCallCheck3.default)(this, Platform);
    return (0, _possibleConstructorReturn3.default)(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).apply(this, arguments));
  }

  (0, _createClass3.default)(Platform, [{
    key: 'render',
    value: function render() {
      var appReducers = this.props.appReducers;

      return _react2.default.createElement(
        _root2.default,
        { reducers: appReducers },
        _react2.default.createElement(
          'div',
          null,
          'Hello World!'
        )
      );
    }
  }]);
  return Platform;
}(_react2.default.Component);

Platform.propTypes = {
  appBadges: _propTypes2.default.array,
  appReducers: _propTypes2.default.array,
  appRoutes: _propTypes2.default.array,
  appUserTasks: _propTypes2.default.array,
  appUserFields: _propTypes2.default.array,
  appUserValues: _propTypes2.default.array
};
exports.default = (0, _reactHotLoader.hot)(module)(Platform);