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
import * as AppActions from 'ACTIONS/AppActions'
import * as AppConst from '../../constants/AppConst'
import Layout from 'COMPONENTS/Layout'

class Test extends Component {
  constructor(props, context) {
    super(props, context)
    const { actions } = this.props
    this.actions = actions
  }
  componentDidMount(){
    document.title = 'Test'
    this.actions.SET_CURRENT_MENU('10')
  }
  
  render() {
    return (
      <div>
        Test TestTestTestTest
      <Link to='/pages/test' > test</Link>
       <Link to='/pages/404'>404</Link>
       <Link to='/pages/home' >home</Link>
         <Button>Hello world! test</Button>
      </div>
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
    actions: bindActionCreators(AppActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)

