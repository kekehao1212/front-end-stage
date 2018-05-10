import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.less'
import Footer from './Footer'
import Header from './Header'
import Navigation from './Navigation'
import merge from 'lodash/merge'
export default class Index extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {children,data} = this.props
    return (
      <div className="layout-block">
        <Header data={data}/>
        <div className='layout-content'>
            <div className="layout-navigation">
              <Navigation data={data||{}}/>
            </div>
            <div className='layout-children'>{children}</div>
        </div>
        <Footer />
      </div>
    )
  }
}
