import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames"
import './style.less'
import Footer from './Footer'
import Header from './Header'
import Navigation from './Navigation'
import merge from 'lodash/merge'

export default class Index extends Component {
  constructor(props) {
    super(props)
    const {children,data} = this.props
    this.state ={
      isShouldHideNav:data.hideNavList.indexOf(location.pathname) == -1
    } 
  }
  render() {
    const {children,data} = this.props
    var isShouldHideNavClass = classNames({
      "layout-navigation":true,
      "hide":data.hideNavList.indexOf(location.pathname) > -1
    })
    return (
      <div className="layout-block">
        <Header data={data}/>
        <div className='layout-content'>
          <div className={isShouldHideNavClass}>
            <Navigation data={data||{}}/>
          </div>
          <div className='layout-children'>{children}</div>
        </div>
        <Footer />
      </div>
    )
  }
}
