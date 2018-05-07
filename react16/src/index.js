import 'babel-polyfill'
import 'react-fastclick';
import React from 'react'
import {render} from 'react-dom'
import { browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import './stylesheets/style.less'
require("babel-core/register");
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
// const history = syncHistoryWithStore(hashHistory, store)
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
