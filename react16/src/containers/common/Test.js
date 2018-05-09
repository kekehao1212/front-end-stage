/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster
 *
 * Last Modified:   18/03/20 
 *
 * 404页面
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd';
import { Link } from 'react-router'
import * as AppConst from '../../constants/AppConst'
import Layout from 'COMPONENTS/Layout'

class Test extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount(){
    document.title = 'Test'
  }
  
  render() {
    const urlObject = {currentUrl:'/test'}
    return (
      <Layout data={urlObject}>
        Test TestTestTestTest
      <Link to='/test' > test</Link>
       <Link to='/404'>404</Link>
       <Link to='/home' >home</Link>
         <Button>Hello world! test</Button>
      </Layout>
    )
  }
}


Test.contextTypes = {
   router: PropTypes.object
}

function mapStateToProps(state) {
  return {
    stores: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)

