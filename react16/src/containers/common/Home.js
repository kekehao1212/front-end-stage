/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster *  * Last Modified:18/03/20 *  * 404页面 */
 import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router';
import * as AppActions from '../../actions/AppActions'
import { Button } from 'antd';
import * as AppConst from '../../constants/AppConst'
import { Link } from 'react-router'
import logo from '../../assets/img/logo.png'
import fetch from 'isomorphic-fetch'
import {fetchAsyncGet, testResult,fetchGet} from '../../modules/fetch'

class Home extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount(){
    document.title = 'home'
    const { actions } = this.props
    //actions.TEST()
    testResult()
    var a = fetchAsyncGet('/myapi?002')
    a.then((r)=>{
        console.log(r)
    })
    fetchGet(AppConst.PROXY_URL.workflow)
  }
  render() {
    return (
      <div className='container container-logo'>
      <Link to='/demo' > Demo </Link>
       <br/>
       <Link to='/test' > test </Link>
       <br/>
       <Link to='/404'>404</Link>
       <br/>
       <Link to='/login'>login</Link>
       <br/>
       <Link to='/register'>register</Link>
       <br/>
       <Button icon='search' onClick={()=>{
         browserHistory.push({ pathname: "/home", query: {
           test:3224
         } })
       }}>home</Button>
        <br/>
        <div style={{display:'none'}}>
        <img src={AppConst.IMGSRC['LOGO']} />
        <br/>
        <img src={logo} />
        </div>
        
      </div>
    )
  }
}


Home.contextTypes = {
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
)(Home)