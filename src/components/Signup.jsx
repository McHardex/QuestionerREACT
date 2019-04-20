/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { signUpUser } from '../actions/authActions';
import '../assets/stylesheets/signup.css';
import Label from './Label.jsx';
import logo from '../assets/images/logo.png';
import Loader from './Loader';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpSuccess: false,
      error: false,
      isLoading: false,
    };
  }

  resetForm = (target) => {
    target.reset();
    this.setState({ isLoading: false });
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
    // eslint-disable-next-line no-shadow
    const { signUpUser } = this.props;
    signUpUser(data, () => this.resetForm(target));

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
      signUpSuccess: nextProps.auth.signUpSuccess,
      error: nextProps.auth.error,
      isLoading: nextProps.auth.isLoading,
    });
  }

  render() {
    const { auth } = this.props;
    const { error, signUpSuccess, isLoading } = this.state;
    if (error) {
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 20000);
    }
    return (
      <div>
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
            <p className="required">
              <sup>*</sup>
              Required
            </p>
            <CSSTransition
              in={signUpSuccess}
              timeout={5000}
              classNames="alert"
              unmountOnExit
            >
              <p id="success">
                  Account Successfully Created
                {' '}
                <Link to="login"> Log in</Link>
              </p>
            </CSSTransition>
            <button type="submit" className="submit-form" id="submit-form">
              Sign up
            </button>
          </form>
        </div>
        <CSSTransition
          in={error}
          timeout={5000}
          classNames="alert"
          unmountOnExit
          onExited={() => this.clearError}
        >
          <div className="error-cont" id="error-div">
            <p id="error">{auth.signUpError}</p>
            <span id="exit-error" role="presentation" onClick={this.clearError} onKeyDown={this.clearError}>X</span>
          </div>
        </CSSTransition>
        {
          isLoading && <Loader />
        }
      </div>
    );
  }
}

const mapStateToProps = auth => auth;
export default connect(mapStateToProps, { signUpUser })(Signup);
