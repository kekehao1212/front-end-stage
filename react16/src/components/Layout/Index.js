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
    var dafaultInfo ={
        menus:[
          {url:'/home?34242',name:'home'},
          {url:'/demo',name:'demo'},
          {url:'/login',name:'login'},
          {url:'/register',name:'register'},
          {url:'/test',name:'tets'},
        ],
        userName:'42343243'
      }
     var dataInfo =  merge({},dafaultInfo,data) 
    return (
      <div className="layout-block">
        <Header data={dataInfo}/>
        <div className='layout-content'>
            <div className="layout-navigation">
              <Navigation />
            </div>
            <div className='layout-children'>{children}</div>
        </div>
        <Footer />
      </div>
    )
  }
}
