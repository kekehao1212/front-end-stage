/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster *  * Last Modified:18/03/20 *  * 404页面 */
 import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.less'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from 'ACTIONS/AppActions'
import { Button } from 'antd';
import * as AppConst from 'CONSTANTS/AppConst'
import fetch from 'isomorphic-fetch'
import {fetchAsyncGet, testResult} from 'MODULES/fetch'
import Layout from 'COMPONENTS/Layout'
import test from '../../../../mockService'

class Index extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount(){
    document.title = 'home'
  }
  render() {
    return (
       <Layout>
         <div className="demo">this is content </div>
       </Layout>
    )
  }
}


Index.contextTypes = {
    router: PropTypes.object
}

function mapStateToProps(state) {
    return {
        stores: state
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)