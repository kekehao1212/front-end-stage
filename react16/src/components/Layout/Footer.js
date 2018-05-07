import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/img/logo.png'

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='layout-footer'>
        <h1>This is Footer block</h1>
      </div>
    )
  }
}
