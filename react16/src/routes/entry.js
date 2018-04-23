import React from 'react'
import { Route } from 'react-router'
import App from '../containers/App'
import * as AppConst from '../constants/AppConst'

const com404 = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../containers/common/Com404').default)
  }, 'com404')
}

const home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../containers/common/Home').default)
  }, 'home')
}

const test = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../containers/common/Test').default)
  }, 'test')
}

let base = AppConst.BASE

export default (
  <Route path={base} component={App} >
    <Route path={base+"/Home"} getComponent={home}  /> 
    <Route path={base+"/test"} getComponent={test}  /> 
    <Route path={"*"} getComponent={com404} />
  </Route>
)
