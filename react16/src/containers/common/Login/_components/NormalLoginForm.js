import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.less'
const FormItem = Form.Item;
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
class NormalLoginForm extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clear = this.clear.bind(this)
    }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  clear(){
    this.props.form.resetFields()
  }
  componentDidMount(){
    this.props.form.setFieldsValue({
        userName:43242432
    })
}
  render() {
    const { getFieldDecorator,getFieldsError , getFieldError, isFieldTouched} = this.props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
        label="用户名"
         validateStatus={userNameError ? 'error' : ''}
         help={userNameError || ''}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Username"  />
          )}
        </FormItem>
        <FormItem
        validateStatus="success"
         validateStatus={passwordError ? 'error' : ''}
         help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-form-button"
            disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
          <Button type="primary"  className="login-form-clear" onClick={this.clear}>
            clear
          </Button>
          <Button type="primary"  className="login-form-clear" onClick={()=>{
              this.props.form.setFields({
                userName:{
                    value:'',
                   // errors:[new Error('forbid ha')],
                }
              })
          }}>
            error
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm