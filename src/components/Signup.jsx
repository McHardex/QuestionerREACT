/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import loader from '../assets/images/loader.gif';
import logo from '../assets/images/logo.png';
import '../assets/stylesheets/signup.css';

const Signup = () => (
  <div>
    <header className="signup">
      <div className="questioner-logo">
        <Link to="/">
          <img src={logo} alt="questioner-logo" className="logo" />
        </Link>
        <span>QUESTIONER</span>
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
      <form className="signup-form" id="signup-form">
        <div className="form-wrapper">
          <div className="form1">
            <label>
              First Name
              <sup>*</sup>
            </label>
            <input
              type="text"
              className="form-input"
              name="firstname"
              required
            />
            <label>
              Last Name
              <sup>*</sup>
            </label>
            <input
              type="text"
              className="form-input"
              name="lastname"
              required
            />
            <label>
              Other Name
              <sup>*</sup>
            </label>
            <input
              type="text"
              className="form-input"
              name="othername"
              required
            />
            <label>
              Username
              <sup>*</sup>
            </label>
            <input
              type="text"
              className="form-input"
              name="username"
              required
            />
          </div>
          <div className="form2">
            <label>
              Email
              <sup>*</sup>
            </label>
            <input type="email" className="form-input" name="email" required />
            <label>
              Phone Number
              <sup>*</sup>
            </label>
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
        <p id="success">
          Account Successfully Created
          {' '}
          <Link to="login"> Log in</Link>
        </p>
        <button type="submit" className="submit-form" id="submit-form">
          Sign up
        </button>
      </form>
    </div>
    <div className="error-cont" id="error-div">
      <p id="error" />
      <span id="exit-error">X</span>
    </div>
    <div id="loader">{loader}</div>
  </div>
);

export default Signup;
