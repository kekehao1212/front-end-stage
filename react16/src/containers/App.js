/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster
 *
 * Last Modified:   18/03/20 
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions'
import Layout from 'COMPONENTS/Layout'
import * as IndexService from 'SERVICES/index'

class App extends Component {
  constructor(props) {
    super(props)
    const {actions,stores} = this.props
    this.actions = actions
    this.getMenuList = IndexService.getMenuList.bind(this)
  }
  componentWillMount(){
    this.getMenuList()
  }
  componentDidMount() {
  
  }
  render() {
    const { children, stores} = this.props
    var data ={
      userName:stores.appReducers.userInfo.pin,
      menuList:stores.appReducers.menuList,
      currentUrlId:stores.appReducers.currentMenu.id,
      hideNavList:['/pages/login','/pages/register']
    }
    return (
      <Layout data={data}>
        {children}
      </Layout>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  // Injected by React Router
  children: PropTypes.node
}


function mapStateToProps(state) {
  return {
    stores: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

