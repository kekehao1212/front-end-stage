/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster
 *
 * Last Modified:   18/03/20 
 *
 */

import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions'
import { Button , Spin, Icon } from 'antd';
class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render() {
    const { children ,stores , actions,location } = this.props
    return (
      <div >
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  // Injected by React Router
  children: PropTypes.node
}


function mapStateToProps(state) {
  return {
    stores: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

