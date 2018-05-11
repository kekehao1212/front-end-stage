import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/img/logo.jpg'
import {Icon} from 'antd'
import {browserHistory} from 'react-router';

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {data} = this.props
    return (
      <div className='layout-header'>
        <div className="header-logo">
          <img src={logo} />
        </div>
        <div className="header-content">
        {
          data&&data.menuList&&data.menuList.map((item,index)=>{
            if(!item.url||!item.name){
              return
            }
            var classNames = item.id==data.currentUrlId?'active':'' ///item.url.indexOf(location.pathname)>-1?'active':''
            return (
              <a href="javascript:void()" 
              className={classNames} 
              key={index}
              onClick={(()=>{
                location = item.url
                return
                if(item&&(item.url.indexOf('http://')==-1||item.url.indexOf('https://')==-1)){
                  browserHistory.push({pathname:item.url})
                }else{
                  location = item.url
                }
              }).bind(this,item)}
              >{item.name}</a> 
            )
          })
        }
        </div>
        <div className="header-right">
          <span  className="header-name">{data.userName} <Icon type="user"  style={{ fontSize: 20 }}/></span>
          <a  className="header-out" href="http://seckill.jd.com/logout.action?__erp_id=dongguoyang">退出</a>
        </div>
      </div>
    )
  }
}


Header.propTypes = {
}
