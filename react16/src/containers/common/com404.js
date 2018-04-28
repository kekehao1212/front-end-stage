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
import { Button ,Input} from 'antd';
import { Link } from 'react-router'

class Com404 extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount(){
    document.title = '404 not found'
    let json = {
      code: 404,
      msg:'页面不存在:' + document.referrer
    }
  }
  
  render() {
    return (
      <div className='container-text container container-text'>
        <div className="com404" style={{marginTop:60+ 'px'}}>404 , not found</div>
        <div className="row " style={{marginTop:100+ 'px'}}>
          <div className="col padding-h-30">
            1233134
          </div>
        </div>
      <Link to='/test' > test</Link>
       <Link to='/404'>404</Link>
       <Link to='/home' >home</Link>
        <Button>Hello world!</Button>
        <Input />
      </div>
    )
  }
}


Com404.contextTypes = {
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
)(Com404)

