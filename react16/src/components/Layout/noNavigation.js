import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.less'
import Footer from './Footer'
import Header from './Header'
import Navigation from './Navigation'

export default class Index extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {children} = this.props
    return (
      <div className="layout-block">
        <Header />
        <div className='layout-content'>
            <div className='layout-children'>{children}</div>
        </div>
        <Footer />
      </div>
    )
  }
}
