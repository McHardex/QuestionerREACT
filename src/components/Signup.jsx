import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { signUpUser } from '../actions/authActions';
import { clearError } from '../actions/action.helpers';
import '../assets/stylesheets/signup.css';
import Label from './Label.jsx';
import Loader from './Loader';
import DisplayMessage from './DisplayMessage';

export class Signup extends Component {
  resetForm = (target) => {
    target.reset();
  }

  signUpUser = (e) => {
    e.preventDefault();
    const data = {};
    const { target } = e;
    const formData = new FormData(target);

    for (const entry of formData.entries()) {
      const [keys, values] = entry;
      data[keys] = values;
    }

    const { signUpUser } = this.props;
    signUpUser(data, () => this.resetForm(target));
  }

  clearError = () => {
    const { clearError } = this.props;
    clearError();
  }

  render() {
    const { auth, loader } = this.props;
    const { isLoading } = loader;
    const { errorMessage, signupError } = auth;
    return (
      <div className="signup-cont">
        {isLoading && <Loader />}
        <header>
          <div className="header-cont">
            <div className="nav1">
              <div className="questioner-logo">
                <img src="https://res.cloudinary.com/mchardex/image/upload/v1558174712/logo.png" alt="questioner-logo" />
                <span>QUESTIONER</span>
              </div>
            </div>
            <div className="nav2">
              <div className="header-utilities">
                <Link to="/signup" className="get-started">Get Started</Link>
                <Link to="/login" className="login">Log in</Link>
              </div>
            </div>
          </div>
        </header>
        <div className="wrapper">
          <h1>Easy to use. Create an account.</h1>
          <div className="have-acc">
            <p>
              Already have an account?
              {' '}
              <Link to="login" className="sign-in-link">
                Login
              </Link>
            </p>
            <hr />
          </div>
          <form className="signup-form" id="signup-form" onSubmit={this.signUpUser} autoComplete="off">
            <div className="form-wrapper">
              <div className="form1">
                <Label htmlFor="username">
                  Username
                  <sup>*</sup>
                </Label>
                <input
                  type="text"
                  className="form-input-signup"
                  name="username"
                  required
                />
                <Label htmlFor="email">
                  Email
                  <sup>*</sup>
                </Label>
                <input type="email" className="form-input-signup" name="email" required />
                <label htmlFor="password">
                  Password
                  <sup>*</sup>
                </label>
                <input
                  type="password"
                  className="form-input-signup"
                  name="password"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirm Password
                  <sup>*</sup>
                </label>
                <input
                  type="password"
                  className="form-input-signup"
                  name="confirmPassword"
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-signup-form">
              Sign up
            </button>
          </form>
        </div>
        <DisplayMessage
          error={signupError}
          message={errorMessage}
          onClick={this.clearError}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  auth: propTypes.shape({
  }).isRequired,
  loader: propTypes.shape({
    isLoading: propTypes.bool,
  }).isRequired,
  signUpUser: propTypes.func.isRequired,
  clearError: propTypes.func.isRequired,
};

const mapStateToProps = ({ auth, loader }) => ({ auth, loader });
export default connect(mapStateToProps, { signUpUser, clearError })(Signup);
