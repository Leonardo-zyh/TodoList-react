import React, { Component } from 'react';
import SignUpForm from './SignUpForm'
import SignInForm from './SignInFrom'

export default class SignInOrSignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signIn'
        }
    }
    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }

render () {
    return (
      <div className="signInOrSignUp">
        <nav>
          <label>
            <input className="radio"  type="radio" value="signUp"
              checked={this.state.selected === 'signUp'}
              onChange={this.switch.bind(this)}
            /> 创建账户</label>
          <label>
            <input className="radio"  type="radio" value="signIn"
              checked={this.state.selected === 'signIn'}
              onChange={this.switch.bind(this)}
            /> 登录账户</label>
        </nav>
        <div className="panes">
          {this.state.selected === 'signUp' ?
            <SignUpForm formData={this.props.formData}
              onSubmit={this.props.onSignUp}
              onChange={this.props.onChange}
            />
            : null}
          {this.state.selected === 'signIn' ?
            <SignInForm formData={this.props.formData}
              onChange={this.props.onChange}
              onSubmit={this.props.onSignIn}
              onForgotPassword={this.props.onForgotPassword}
            />
            : null}
        </div>
      </div>
    )
  }
}