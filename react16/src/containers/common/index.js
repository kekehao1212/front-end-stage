/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster
 *
 * Last Modified:   18/03/20 
 *
 * 404页面
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd';

class Home extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount(){
    document.title = 'home'
  }
  
  render() {
    return (
      <div className='container-text container container-text'>
        <Button>this is home</Button>
      </div>
    )
  }
}


Home.contextTypes = {
   router: PropTypes.object
}

function mapStateToProps(state) {
  return {
    stores: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

