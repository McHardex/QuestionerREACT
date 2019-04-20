/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { loginUser } from '../actions/authActions';
import '../assets/stylesheets/login.css';
import logo from '../assets/images/logo.png';
import Loader from './Loader';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      isLoading: false,
    };
  }

  redirect = () => {
    this.setState({
      redirect: true,
      isLoading: false,
    });
  }

  login = (e) => {
    e.preventDefault();
    const data = {};
    const { target } = e;
    const formData = new FormData(target);

    for (const entry of formData.entries()) {
      const [keys, values] = entry;
      data[keys] = values;
    }

    const { loginUser } = this.props;
    loginUser(data, () => this.redirect());

    // change Loading state
    this.setState({ isLoading: true });
  }

  clearError = () => {
    this.setState({
      error: false,
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      error: nextProps.auth.error,
      isLoading: nextProps.auth.isLoading,
    });
  }

  render() {
    const { auth } = this.props;
    const {
      error, isLoading, redirect,
    } = this.state;
    return (
      <div className="login-cont">
        <div className="col1">
          <div className="col1-cont">
            <div className="logo-icon">
              <Link to="/"><img src={logo} alt="questioner-logo" /></Link>
              <span>QUESTIONER</span>
            </div>
            <form className="login-form" id="login-form" onSubmit={this.login}>
              <label htmlFor="email">Email</label>
              <input type="email" className="login-input" name="email" required />
              <br />
              <label htmlFor="password">Password</label>
              <input type="password" className="login-input" name="password" required />
              <br />
              <button type="submit" className="sign-in">Sign in</button>
            </form>
            <div className="more-details">
              <Link to="/">Forgot password?</Link>
              <div className="or">
                <hr className="bar" />
                <span>OR</span>
                <hr className="bar" />
              </div>
              <Link to="/signup" className="sign-up">Create an account</Link>
            </div>
          </div>
        </div>
        <div className="col2">
          <h1>
        Lets create the future
            {' '}
            <strong>together</strong>
          </h1>
          <Link to="/signup" className="getstarted">Get started today</Link>
        </div>
        <CSSTransition
          in={error}
          timeout={5000}
          classNames="alert"
          unmountOnExit
          onExited={() => this.clearError}
        >
          <div className="error-cont" id="error-div">
            <p id="error">{auth.loginError}</p>
            <span id="exit-error" role="presentation" onClick={this.clearError} onKeyDown={this.clearError}>X</span>
          </div>
        </CSSTransition>
        { isLoading && <Loader />}
        { redirect && <Redirect to="/meetups" /> }
      </div>
    );
  }
}


const mapStateToProps = auth => auth;

export default connect(mapStateToProps, { loginUser })(Login);
