/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster *  * Last Modified:18/03/20 *  * 404页面 */
 import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, DatePicker  } from 'antd'
import * as AppConst from '../../constants/AppConst'
import { Link } from 'react-router'
import logo from '../../assets/img/logo.png'

class Home extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount() {
        document.title = 'home'
    }

    render() {
        return ( < div className = 'container-text container container-text' >
            <Link to = '/test' > test </Link>  
            <Link to = '/404' > 404 </Link>  
            <Link to = '/home' > home </Link>  
            <Button icon = "search" > Search </Button>  
            <img src = { AppConst.IMGSRC['LOGO'] }/>  
            <img src = { logo }/>  
            <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"/>
            </div >
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)