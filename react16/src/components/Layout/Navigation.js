import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/img/logo.png'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    const {actions,data} = this.props
  }
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  state = {
    openKeys: ['sub1'],
  };
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  getSubMenuList=()=>{
    const {data} = this.props
    var currentUrlId = data.currentUrlId
    var menulist = data.menuList
    var subMenuList = []
    menulist.map((item)=>{
      if(item.id == currentUrlId){
        subMenuList = item.subMenuList
      }
    })
    return subMenuList
  }
  render() {
    const {data} = this.props
    var subMenuList = this.getSubMenuList()
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256, borderRadius: '5px' }}
      >
      {
        subMenuList.map((item,index)=>{
          var nextSub = item.subMenuList
          return (
            <SubMenu key={'sub'+ index} title={<span><Icon type="mail" /><span>{item.name}</span></span>}>
              {
                nextSub.map((item,index)=>{
                    return (
                      <Menu.Item key={index}>{item.name}</Menu.Item>
                    )
                  })
              }
            </SubMenu>
          )
        })
      }
        
        {/* <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
    );
  }
}

