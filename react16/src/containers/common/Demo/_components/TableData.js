import React, { Component } from 'react'
import { Table } from 'antd';
import {fetchAsyncGet, testResult,fetchGet} from 'MODULES/fetch'
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],   
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

class TableData extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            data: [],
            pagination: {},
            loading: false,
          };
          this.handleTableChange = this.handleTableChange.bind(this)
          this.fetchApi = this.fetchApi.bind(this)
    }
  
  handleTableChange(pagination, filters, sorter){
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetchApi({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetchApi(params = {}){
    console.log('params:', params);
    this.setState({ loading: true });
    fetchGet('/rand-api',params).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }
  componentDidMount() {
    this.fetchApi();
  }
  render() {
    return (
      <Table columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
export  default  TableData