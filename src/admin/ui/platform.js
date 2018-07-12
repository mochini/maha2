import initReactFastclick from 'react-fastclick'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import React from 'react'
import Root from './root'

initReactFastclick()

class Platform extends React.Component {

  static propTypes = {
    appBadges: PropTypes.array,
    appReducers: PropTypes.array,
    appRoutes: PropTypes.array,
    appUserTasks: PropTypes.array,
    appUserFields: PropTypes.array,
    appUserValues: PropTypes.array
  }

  render() {
    const { appReducers } = this.props
    return (
      <Root reducers={ appReducers }>
        <div>Hello World!</div>
      </Root>
    )
  }

}


export default hot(module)(Platform)
