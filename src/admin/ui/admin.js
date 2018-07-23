import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const admin = (features) => {

  const element = document.getElementById('platform')

  ReactDOM.render(<App { ...features } />, element)

}

export default admin
