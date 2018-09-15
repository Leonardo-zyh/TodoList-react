import React, { Component } from 'react';
import './UserDialog.css'

import { signUp, signIn,signOut, sendPasswordResetEmail } from './leanCloud'
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
      //this.props.onSignUp.call(null, user)
      alert('注册成功，请验证账号邮箱后登陆')
      signOut()
    }
    let error = (error) => {
      switch (error.code) {
        case 202:
          alert('用户名已被占用')
          break
        case 203:
          alert('邮件地址已被占用')
          break
        case 125:
          alert('邮件地址无效')
          break
        case 201:
          alert('密码不能为空')
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
      window.location.reload() //登录刷新
    }
    let error = (error) => {
      switch (error.code) {
        case 210:
          alert('用户名与密码不匹配')
          break
        case 211:
          alert('用户名不存在')
          break
        case 216:
          alert('邮箱地址未验证')
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

