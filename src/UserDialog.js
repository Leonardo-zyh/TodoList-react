import React, { Component } from 'react';
import './UserDialog.css'

import { signUp, signIn, sendPasswordResetEmail } from './leanCloud'
import SignInOrSignUp from './SignInOrSignUp'
import ForgotPassword from './ForgotPassword'

export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {

      selectedTab: 'signInOrSignUp',
      formData: {
        email: '',
        username: '',
        password: '',
      }

    }
  }

  signUp(e) {
    e.preventDefault()
    let { email, username, password } = this.state.formData
    let success = (user) => {
      this.props.onSignUp.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 202:
          alert('用户名已被占用')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(email, username, password, success, error)
  }

  signIn(e) {
    e.preventDefault()
    let { username, password } = this.state.formData
    let success = (user) => {
      this.props.onSignIn.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 210:
          alert('用户名与密码不匹配')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(username, password, success, error)
  }

  changeFormData(key, e) {
    let stateCope = JSON.parse(JSON.stringify(this.state))  //JSON深拷贝
    stateCope.formData[key] = e.target.value
    this.setState(stateCope)
  }

  showForgotPassword() {
    let stateCope = JSON.parse(JSON.stringify(this.state))
    stateCope.selectedTab = 'forgotPassword'
    this.setState(stateCope)
  }
  resetPassword(e) {
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email)
  }
  returnToSignIn() {
    let stateCope = JSON.parse(JSON.stringify(this.state))
    stateCope.selectedTab = 'signInOrSignUp'
    this.setState(stateCope)
  }


  render() {
    
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signInOrSignUp' ?
            <SignInOrSignUp
              formData={this.state.formData}
              onSignIn={this.signIn.bind(this)}
              onSignUp={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onForgotPassword={this.showForgotPassword.bind(this)}
            /> :
            <ForgotPassword
              formData={this.state.formData}
              onSubmit={this.resetPassword.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onSignIn={this.returnToSignIn.bind(this)} />
          }
        </div>
      </div>
    )            //判断selected，执行变量
  }
}

