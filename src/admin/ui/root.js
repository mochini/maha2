import authenticationMiddleware from '../../lib/redux/authentication_middleware'
import fingerprintMiddleware from '../../lib/redux/fingerprint_middleware'
import tokenMiddleware from '../../lib/redux/token_middleware'
import createSocketioClient from 'redux-socketio-client'
import { createStore, applyMiddleware } from 'redux'
import createlocalStorage from 'redux-local-storage'
import { combineReducers } from 'redux-rubberstamp'
import createApiRequest from 'redux-api-request'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
// import Reframe from 'reframe'
import React from 'react'

class Root extends React.Component {

  static propTypes = {
    reducers: PropTypes.array,
    children: PropTypes.any
  }

  constructor(props) {
    super(props)
    this.store = this._getStore()
  }

  render() {
    return (
      <Provider store={ this.store }>
        { this.props.children }
      </Provider>
    )
  }

  _getStore() {
    const reducer = combineReducers(this.props.reducers)

    const loggerMiddleware = createLogger({ collapsed: true })

    const apiRequestMiddleware = createApiRequest()

    const socketUrl = `${window.location.protocol}//${window.location.hostname}:${process.env.SOCKET_PORT}`

    const socketioClientMiddleware = createSocketioClient({ url: socketUrl })

    const localStorageMiddleware = createlocalStorage()

    const middleware = [
      thunkMiddleware,
      tokenMiddleware,
      fingerprintMiddleware,
      apiRequestMiddleware,
      socketioClientMiddleware,
      localStorageMiddleware,
      authenticationMiddleware,
      ...(process.env.NODE_ENV !== 'production') ? [loggerMiddleware] : []
    ]

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

    return createStoreWithMiddleware(reducer)

  }

}

export default Root
