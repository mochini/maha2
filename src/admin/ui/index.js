// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Platform from './platform'

const admin = (features) => {

  const element = document.getElementById('platform')

  ReactDOM.render(<Platform { ...features } />, element)

}

export default admin
