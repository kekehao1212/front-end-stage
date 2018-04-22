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
    callback(null, require('../containers/common/index').default)
  }, 'home')
}

let base = AppConst.BASE

export default (
  <Route path={base} component={App} >
    <Route path={base+"/index"} getComponent={home}  /> 
    <Route path={"*"} getComponent={com404} />
  </Route>
)
