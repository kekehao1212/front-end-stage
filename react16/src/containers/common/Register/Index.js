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
import RegistrationForm from './_components/RegistrationForm'
import Layout from 'COMPONENTS/Layout'

const FormItem = Form.Item;

//const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Register extends React.Component {
    constructor(props, context) {
    super(props, context)
    }
    componentDidMount(){
        document.title = 'Register'
    }

    render() {
      const urlObject = {currentUrl:'/register'}
      return (
        <div>
        <RegistrationForm />
        </div>
      )
    }
  }

  Register.contextTypes = {
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
)(Register)

