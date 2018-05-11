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
import { Tabs,Form , Row, Col, Input, Button, Icon} from 'antd';
import * as AppConst from 'CONSTANTS/AppConst'
import fetch from 'isomorphic-fetch'
import {fetchAsyncGet, testResult} from 'MODULES/fetch'
import Layout from 'COMPONENTS/Layout'
import TableData from './_components/TableData'
import Tab1 from './_components/Tab1'


class Index extends Component {
  constructor(props, context) {
    super(props, context)
  }
  state = {
    expand: false,
  };
  componentDidMount(){
    const { actions } = this.props
    this.actions = actions
    document.title = 'home'
    this.actions.SET_CURRENT_MENU('11')
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }
  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <FormItem label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }
  
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={()=>{}}>
          <Tabs.TabPane tab="Tab 1" key="1">
            <Tab1/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
       </div>
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