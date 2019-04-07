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
          <a href="jjjj">Forgot password?</a>
          <div className="or">
            <hr className="bar" />
            <span>OR</span>
            <hr className="bar" />
          </div>
          <a href="./signup.html" className="sign-up">Create an account</a>
        </div>
      </div>
    </div>
    <div className="col2">
      <h1>
Let's create the future
        {' '}
        <strong>together</strong>
            </h1>
      <a href="./signup.html" className="getstarted">Get started today</a>
    </div>
    <div className="error-cont" id="error-div">
      <p id="error" />
      <span id="exit-error">X</span>
    </div>
  </div>
);

export default Login;
