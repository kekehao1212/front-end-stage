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
import { Button ,Input} from 'antd';
import { Link } from 'react-router'
import Layout from 'COMPONENTS/Layout'
import * as AppActions from 'ACTIONS/AppActions'

class Com404 extends Component {
  constructor(props, context) {
    super(props, context)
    const { actions } = this.props
    this.actions = actions
  }
  componentDidMount(){
    document.title = '404 not found'
    let json = {
      code: 404,
      msg:'页面不存在:' + document.referrer
    }
    this.actions.SET_CURRENT_MENU('9')
  }
  
  render() {
    const urlObject = {currentUrl:'/pages/404'}
    return (
      <div>
        <div className="com404" style={{marginTop:60+ 'px'}}>404 , not found</div>
        <div className="row " style={{marginTop:100+ 'px'}}>
          <div className="col padding-h-30">
            1233134
          </div>
        </div>
      <Link to='/pages/test' > test</Link>
       <Link to='/pages/404'>404</Link>
       <Link to='/pages/home' >home</Link>
        <Button>Hello world!</Button>
        <Input />
      </div>
    )
  }
}


Com404.contextTypes = {
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
)(Com404)

