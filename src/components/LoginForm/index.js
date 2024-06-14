import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  onClickLoginSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  onClickLoginFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      this.onClickLoginSuccess(responseData.jwt_token)
    } else {
      this.onClickLoginFailure(responseData.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderFormContainer = () => {
    const {username, password, isError, errorMsg} = this.state
    return (
      <div className="form-container">
        <img
          src="https://res.cloudinary.com/du4atyy1w/image/upload/v1717394104/BookHub%20Project/lli34psxzml7zo2v5eag.png"
          className="login-image"
          alt="website login"
        />
        <form className="login-form" onSubmit={this.onSubmitLogin}>
          <img
            src="https://res.cloudinary.com/du4atyy1w/image/upload/v1717394104/BookHub%20Project/lli34psxzml7zo2v5eag.png"
            className="login-mobile-image"
            alt="login website logo"
          />
          <img
            src="https://res.cloudinary.com/du4atyy1w/image/upload/v1717394100/BookHub%20Project/su9ig0g5bzv8xcmzkmrb.png"
            alt="book hub"
            className="book-hub-logo"
          />
          <div className="login-input-container">
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="login-input-el"
              onChange={this.onChangeUsername}
              value={username}
              placeholder="Username"
              id="username"
            />
          </div>
          <div className="login-input-container">
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="login-input-el"
              onChange={this.onChangePassword}
              value={password}
              placeholder="Password"
              id="password"
            />
          </div>
          {isError && <p className="login-error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">{this.renderFormContainer()}</div>
    )
  }
}
export default LoginForm
