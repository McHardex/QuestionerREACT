import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import logo from '../assets/images/logo.png';
import '../assets/stylesheets/landingPage.css';
import Logout from './Logout';


const Header = (props) => {
  const { role, username } = props;
  if (role && username) {
    return (
      <header>
        <div className="questioner-logo">
          <a href="./meetups.html"><img src={logo} alt="questioner-logo" /></a>
          <span>QUESTIONER</span>
        </div>
        <div className="user">
          <i className="fas fa-user-cog" />
          <span id="user">{username}</span>
          <div className="dropdown-content">
            <Link to="/profile">Profile </Link>
            <Link to="/meetups">Meetup </Link>
            <Link to="/admin" id="admin">Admin</Link>
            <Logout />
          </div>
        </div>
      </header>
    );
  }
  return (
    <header>
      <div className="questioner-logo">
        <a href="./meetups.html"><img src={logo} alt="questioner-logo" /></a>
        <span>QUESTIONER</span>
      </div>
      <div className="user">
        <i className="fas fa-user-cog" />
        <span id="user" />
        <div className="dropdown-content">
          <Link to="/profile">Profile </Link>
          <Link to="/meetups">Meetup </Link>
          <Logout />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  role: propTypes.bool,
  username: propTypes.string.isRequired,
};

Header.defaultProps = {
  role: propTypes.bool,
};

export default Header;
