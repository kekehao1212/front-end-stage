/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster *  * Last Modified:18/03/20 *  * 404页面 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from 'ACTIONS/AppActions'
import { Tabs,Form ,Table, Row, Col, Input, Button, Icon} from 'antd';
import * as AppConst from 'CONSTANTS/AppConst'
import fetch from 'isomorphic-fetch'
import {fetchAsyncGet, testResult,fetchGet} from 'MODULES/fetch'
import Layout from 'COMPONENTS/Layout'
import merge from 'lodash/merge'
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
  }, {
    title: 'Gender',
    dataIndex: 'gender',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],   
    width: '20%',
  }, {
    title: 'Email',
    dataIndex: 'email',
  },{
      title: 'login name',
      dataIndex: 'login',
      sorter: true,
      render: login => `${login.username}`,
      width: '20%',
    }, 
    { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a> },
  ];

  
class Index extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
        data: [],
        pagination: {},
        loading: false,
        filters:{},
        sorter:{}
    };
    this.handleTableChange = this.handleTableChange.bind(this)
    this.fetchApi = this.fetchApi.bind(this)
  }
  componentDidMount() {
    this.fetchApi();
  }
  handleTableChange(pagination, filters, sorter){
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    filters = merge({},filters,this.state.filters)
    this.syncFilter(filters,sorter);
    this.fetchApi({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetchApi(params = {}){
    this.setState({ loading: true });
    fetchGet('/rand-api',params).then((data) => {
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }
  syncFilter=(filters,sorter)=>{
    this.setState({
        sorter:sorter
    })
    this.setState({
        filters:filters
    })
  }
  search=()=>{
    this.setState({
        pagination:{
            current:1
        }
    })
    this.handleTableChange(this.state.pagination, this.state.filters, this.state.sorter)
  }
  reset=(e)=>{
    this.setState({
        pagination:{
            current:1, 
        },
        sorter:{},
        filters:[]
    })
    this.refs['gender'].value=''
    e.target.value = ''
  }

  
  render() {
    return (
      <div>
        <div className="input-block">
            <label>gender</label>
            <input className="ant-input" placeholder="default size" ref='gender' id='gender' onChange={(e)=>{
                this.state.filters['gender'] = e.target.value
            }}/>  
        </div>
        <div className="input-block">
            <label>活动名称：</label>
            <Input placeholder="default size"/>  
        </div>
        <div className="input-block">
            <Button type="primary" icon="search" onClick={this.search}>Search</Button>
        </div>
        <div className="input-block">
            <Button type="primary" icon="resetting" onClick={this.reset}>reset</Button>
        </div>
        <Table columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}/>
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