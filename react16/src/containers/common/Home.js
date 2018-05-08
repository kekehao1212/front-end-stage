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
import { Button , Spin, Icon ,Popconfirm,Switch,message} from 'antd';
import * as AppConst from '../../constants/AppConst'
import { Link } from 'react-router'
import logo from '../../assets/img/logo.png'
import fetch from 'isomorphic-fetch'
import {fetchAsyncGet, testResult,fetchGet} from '../../modules/fetch'

class Home extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      visible: false,
      condition: true, // Whether meet the condition, if not show popconfirm.
    }
   // this.changeCondition = this.changeCondition.bind(this)
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
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
  changeCondition(value){
    this.setState({ condition: value });
  }
  confirm(){
    this.setState({ visible: false });
    message.success('Next step.');
  }
  cancel(){
    this.setState({ visible: false });
    message.error('Click on cancel.');
  }
  handleVisibleChange(visible){
    if (!visible) {
      this.setState({ visible });
      return;
    }
    // Determining condition before show the popconfirm.
    console.log(this.state.condition);
    if (this.state.condition) {
      this.confirm(); // next step
    } else {
      this.setState({ visible }); // show the popconfirm
    }
  }
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
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
         fetchGet(AppConst.PROXY_URL.workflow)
       }}>home</Button>
        <br/>

        <div>
          <Popconfirm
            title="Are you sure delete this task?"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete a task</a>
          </Popconfirm>
          <br />
          <br />
          Whether directly execute：<Switch defaultChecked onChange={this.changeCondition} />
        </div>


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