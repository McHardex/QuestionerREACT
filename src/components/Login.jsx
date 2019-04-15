/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/stylesheets/login.css';
import logo from '../assets/images/logo.png';

const Login = () => (
  <div className="login-cont">
    <div className="col1">
      <div className="col1-cont">
        <div className="logo-icon">
          <Link to="/"><img src={logo} alt="questioner-logo" /></Link>
          <span>QUESTIONER</span>
        </div>
        <form className="login-form" id="login-form">
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
    <div className="error-cont" id="error-div">
      <p id="error" />
      <span id="exit-error">X</span>
    </div>
  </div>
);

export default Login;
