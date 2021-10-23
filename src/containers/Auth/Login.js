import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
// import { KeyCodeUtils, LanguageUtils } from '../utils';

// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
import './Login.scss';

import { handleLogin } from '../../services/userService';
// import { userLoginSuccess } from '../../store/actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }

  initialState = {
    username: '',
    password: '',
    loginError: '',
    isShow: false,
    errorMessage: '',
  };

  state = {
    ...this.initialState,
  };

  handleOnUserNameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnPasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleOnShowPasswordClick = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };

  handleOnSignInButton = async () => {
    this.setState({ errorMessage: '' });
    try {
      let data = await handleLogin(this.state.username, this.state.password);
      if (data?.data?.errorCode !== 0) {
        this.setState({
          errorMessage: data.data.message,
        });
      }
      if (data?.data?.errorCode === 0) {
        this.props.userLoginSuccess(data.data.user);
      }
    } catch (error) {
      this.setState({
        errorMessage: error?.response?.data?.message ?? '',
      });
    }
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="form-sign-in">
          <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={this.state.username}
              onChange={(event) => {
                this.handleOnUserNameChange(event);
              }}
            />
            <label htmlFor="floatingInput">User name</label>
          </div>

          <div className="form-floating">
            <input
              type={this.state.isShow ? 'text' : 'password'}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={this.state.password}
              onChange={(event) => this.handleOnPasswordChange(event)}
              onKeyDown={(event) => this.handleKeyDown(event)}
            />
            <span onClick={() => this.handleOnShowPasswordClick()}>
              {this.state.isShow ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {/* <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div> */}

          <div style={{ color: 'red' }}>{this.state.errorMessage}</div>

          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={() => this.handleOnSignInButton()}
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 h3 text-center">or Sign in with</p>
          <div className="social-list-button">
            <span>
              <i className="fab fa-google-plus"></i>
            </span>
            <span>
              <i className="fab fa-facebook"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
