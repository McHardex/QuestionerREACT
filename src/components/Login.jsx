import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { loginUser } from '../actions/authActions';
import { clearError } from '../actions/action.helpers';
import '../assets/stylesheets/login.css';
import Loader from './Loader';
import DisplayMessage from './DisplayMessage';


class Login extends Component {
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
    loginUser(data);
  }

  clearError = () => {
    const { clearError } = this.props;
    clearError();
  }

  render() {
    const { auth, loading } = this.props;
    const { loader } = loading;
    const {
      loginError, errorMessage,
    } = auth;
    return (
      <div className="login-cont">
        <div className="col1">
          <div className="col1-cont">
            <div className="logo-icon">
              <Link to="/"><img src="https://res.cloudinary.com/mchardex/image/upload/v1558174712/logo.png" alt="questioner-logo" /></Link>
              <span>QUESTIONER</span>
            </div>
            <form className="login-form" id="login-form" onSubmit={this.login}>
              <label htmlFor="email">Email</label>
              <input type="email" className="login-input" name="email" autoComplete="email" required />
              <br />
              <label htmlFor="password">Password</label>
              <input type="password" className="login-input" name="password" autoComplete="current-password" required />
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
            <strong> together</strong>
          </h1>
          <Link to="/signup" className="getstarted">Get started today</Link>
        </div>
        <DisplayMessage
          error={loginError}
          message={errorMessage}
          onClick={this.clearError}
        />
        {loader && <Loader />}
      </div>
    );
  }
}

Login.propTypes = {
  auth: propTypes.shape({
  }).isRequired,
  loading: propTypes.shape({
    loader: propTypes.bool,
  }).isRequired,
  loginUser: propTypes.func.isRequired,
  clearError: propTypes.func.isRequired,
};

const mapStateToProps = ({ auth, loading }) => ({ auth, loading });

export default connect(mapStateToProps, { loginUser, clearError })(Login);
