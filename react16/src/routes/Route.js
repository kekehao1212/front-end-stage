import React from 'react'
import { Route,IndexRoute,browserHistory } from 'react-router'
import App from '../containers/App'
import Cookies from 'js-cookie'
import * as AppConst from 'CONSTANTS/AppConst'

function validLogin(location, callback){
  if (!Cookies.get('sso.jd.com') && location.pathname !== '/login') { // 判断是否已经登录且前往的页面不是登录页
    browserHistory.replace({ pathname: "/login", query: {
            test:3224,
            callbackUrl:window.location.href
          } })
  } else { // 判断是否已经登录且前往的是登录页
    callback()
  } 
}

const com404 = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../containers/common/Com404').default)
  }, 'com404')
}

const home = (location, callback) => {
  require.ensure([], require => {
    validLogin(location,()=>{
      callback(null, require('../containers/common/Home').default)
    })
  }, 'home')
}

const test = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../containers/common/Test').default)
  }, 'test')
}

const login = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../containers/common/Login').default)
  }, 'login')
}

const register = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../containers/common/Register').default)
  }, 'register')
}

const demo = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../containers/common/Demo/Index').default)
  }, 'demo')
}

// 页面路由访问路径
const base = AppConst.ROUTE_PATH
   
export default (
  <Route path={'/'} component={App} >
    <IndexRoute getComponent={demo} /> 
    <Route path={base } getComponent={demo}  onLeave={(nextState, replaceStatea)=>{}}/> 
    <Route path={base + "/Home"} getComponent={home} onEnter={(nextState, replaceState)=>{}} /> 
    <Route path={base + "/test"} getComponent={test}  />
    <Route path={base + "/login"} getComponent={login}  />
    <Route path={base + "/register"} getComponent={register}  />
    <Route path={base + "/demo"} getComponent={demo}  onLeave={(nextState, replaceStatea)=>{}}/> 
    <Route path={"*"} getComponent={com404} />
  </Route>
)
