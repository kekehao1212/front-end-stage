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
import { Link } from 'react-router'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import NormalLoginForm from './_components/NormalLoginForm'
import Layout from 'COMPONENTS/Layout'
import * as AppActions from 'ACTIONS/AppActions'

const FormItem = Form.Item;

//const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends React.Component {
    constructor(props, context) {
    super(props, context)
    const { actions } = this.props
    this.actions = actions
    }
    componentDidMount(){
        document.title = 'Login'
        this.actions.SET_CURRENT_MENU('18')
    }

    render() {
      return (
        <div>
        <NormalLoginForm />
        </div>
      )
    }
  }

Login.contextTypes = {
   router: PropTypes.object
}

function mapStateToProps(state) {
  return {
    stores: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

