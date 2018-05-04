/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster *  * Last Modified:18/03/20 *  * 404页面 */
 import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions/AppActions'
import { Button } from 'antd';
import * as AppConst from '../../constants/AppConst'
import { Link } from 'react-router'
import logo from '../../assets/img/logo.png'
import fetch from 'isomorphic-fetch'
import {fetchAsyncGet, testResult} from '../../modules/fetch'

class Home extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount(){
    document.title = 'home'
    const { actions } = this.props
    actions.TEST()
    testResult()
    var a = fetchAsyncGet('/myapi?002')
    a.then((r)=>{
        console.log(r)
    })
  }
  render() {
    return (
      <div className='container-text container container-text'>
       <Link to='/test' > test </Link>
       <Link to='/404'>404</Link>
       <Button icon='search' onClick={()=>{
         this.context.router.push({ pathname: "/home", query: {
           test:3224
         } })
       }}>home</Button>
        <img src={AppConst.IMGSRC['LOGO']} />
        <img src={logo} />
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