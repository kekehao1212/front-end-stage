import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/img/logo.png'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='layout-header'>
        <h1>This is header block</h1>
      </div>
    )
  }
}
