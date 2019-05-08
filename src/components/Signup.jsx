import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { signUpUser } from '../actions/authActions';
import { clearError } from '../actions/action.helpers';
import '../assets/stylesheets/signup.css';
import Label from './Label.jsx';
import logo from '../assets/images/logo.png';
import Loader from './Loader';
import DisplayMessage from './DisplayMessage';

class Signup extends Component {
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
    const { auth } = this.props;
    const { errorMessage, signupError, signupSuccess } = auth;
    return (
      <div>
        {auth.isLoading && <Loader />}
        <header>
          <div className="header-cont">
            <div className="nav1">
              <div className="questioner-logo">
                <img src={logo} alt="questioner-logo" />
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
                Sign in
              </Link>
            </p>
            <hr />
          </div>
          <form className="signup-form" id="signup-form" onSubmit={this.signUpUser}>
            <div className="form-wrapper">
              <div className="form1">
                <Label htmlFor="firstname">
                  First Name
                  <sup>*</sup>
                </Label>
                <input
                  id="firstname"
                  type="text"
                  className="form-input"
                  name="firstname"
                  required
                />
                <Label htmlFor="lastname">
                  Last Name
                  <sup>*</sup>
                </Label>
                <input
                  type="text"
                  className="form-input"
                  name="lastname"
                  required
                />
                <Label htmlFor="othername">
                  Other Name
                  <sup>*</sup>
                </Label>
                <input
                  type="text"
                  className="form-input"
                  name="othername"
                  required
                />
                <Label htmlFor="username">
                  Username
                  <sup>*</sup>
                </Label>
                <input
                  type="text"
                  className="form-input"
                  name="username"
                  required
                />
              </div>
              <div className="form2">
                <Label htmlFor="email">
                  Email
                  <sup>*</sup>
                </Label>
                <input type="email" className="form-input" name="email" required />
                <Label htmlFor="phonenumber">
                  Phone Number
                  <sup>*</sup>
                </Label>
                <input
                  type="number"
                  className="form-input"
                  name="phoneNumber"
                  required
                />
                <label htmlFor="password">
                  Password
                  <sup>*</sup>
                </label>
                <input
                  type="password"
                  className="form-input"
                  name="password"
                  required
                />
              </div>
            </div>
            <CSSTransition
              in={signupSuccess}
              timeout={5000}
              classNames="alert"
              unmountOnExit
            >
              <p id="success">
                Account Successfully Created
                <Link to="login"> Log in</Link>
              </p>
            </CSSTransition>
            <button type="submit" className="submit-signup-form">
              Sign up
            </button>
            <p className="required">
              <sup>*</sup>
              Required
            </p>
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
  signUpUser: propTypes.func.isRequired,
  clearError: propTypes.func.isRequired,
};

const mapStateToProps = auth => auth;
export default connect(mapStateToProps, { signUpUser, clearError })(Signup);
