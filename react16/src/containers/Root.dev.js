import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import routes from '../routes/entry'
import DevTools from './DevTools'
import { Router } from 'react-router'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    // console.log(store.getState())
    return (
      <Provider store={store}>
        <div>
          <Router history={history}  routes={routes} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
