import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/stylesheets/landingPage.css';

const Header = () => (
  <header>
    <div className="header-cont">
      <div className="nav1">
        <div className="questioner-logo">
          <Link to="/"><img src={logo} alt="questioner-logo" /></Link>
          <span>QUESTIONER</span>
        </div>
      </div>
      <div className="nav2">
        <div className="header-utilities">
          <Link to="/signup" className="get-started">
            Get Started
          </Link>
          <Link to="login" className="login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
