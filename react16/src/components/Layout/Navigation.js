import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/img/logo.png'
import { Menu, Icon } from 'antd';
import classNames from "classnames"

const SubMenu = Menu.SubMenu;

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cls:'ant-menu-item-selected',
      openKeys: ['sub0'],
    }
  }
  // submenu keys of first level
  rootSubmenuKeys = ['sub0', 'sub1', 'sub2'];
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
  clickMenu=( item, key, keyPath)=>{
    location.href = item.url
    this.setState({
      cls:''
    })
  }
  getDefaultMenuId(subMenuList){
    var currentUrPath = location.pathname
    var defaultMenuId=''
    subMenuList.map((item,index)=>{
      var currentIndex = index
      if(item.url&&item.url.indexOf(currentUrPath)>-1){
        defaultMenuId = item.id
      }
      item.subMenuList.map((item,index)=>{
        if(item.url.indexOf(currentUrPath)>-1){
          defaultMenuId = item.id
        }
      })
    })
    
    return defaultMenuId
  }
  render() {
    // ant-menu-item-selected
    const {data} = this.props
    var subMenuList = this.getSubMenuList()
    var defaultMenuId = this.getDefaultMenuId(subMenuList)
    return (
      <Menu
      forceSubMenuRender={true}
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        //onClick={this.clickMenu}
        style={{ width: 250, borderRadius: '5px' }}
      >
      {
        subMenuList.map((item,index)=>{
          var nextSub = item.subMenuList
          if(nextSub.length){
            return (
              <SubMenu key={'sub' + index} title={<span>{item.name}</span>}>
                {
                  nextSub.map((item,index)=>{
                      return (
                        <Menu.Item key={item.id} onClick={this.clickMenu.bind(this,item)}>{item.name}</Menu.Item>
                      )
                    })
                }
              </SubMenu>
            )
          }else{
            return (
                    <Menu.Item key={index} onClick={this.clickMenu.bind(this,item)} className={defaultMenuId==item.id?this.state.cls:''}>{item.name}</Menu.Item>
                  )
          }
        })
      }
      </Menu>
    );
  }
}

