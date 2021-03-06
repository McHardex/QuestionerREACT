import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCurrentUser } from '../actions/meetupActions';
import decodeToken from '../utils/decodeToken';
import '../assets/stylesheets/landingPage.css';
import Logout from './Logout';


export class Header extends Component {
  componentDidMount = () => {
    const { getCurrentUser } = this.props;
    getCurrentUser();
    const token = localStorage.getItem('token');
    if (!token) {
      window.location = '/login';
    } else {
      const decoded = decodeToken(token);
      if (decoded.exp > new Date().getTime()) {
        window.location = '/login';
      }
    }
  }

  render() {
    const { meetups } = this.props;
    const { user } = meetups;
    const { isAdmin, username } = user;
    return (
      <div>
        {
          isAdmin && username ? (
            <header>
              <div className="questioner-logo">
                <Link to="/meetups"><img src="https://res.cloudinary.com/mchardex/image/upload/v1558174712/logo.png" alt="questioner-logo" /></Link>
                <span>QUESTIONER</span>
              </div>
              <div className="user">
                <i className="fas fa-user-cog" />
                <span id="user">{username}</span>
                <div className="dropdown-content">
                  <Link to="/profile">Profile </Link>
                  <Link to="/meetups">Meetups </Link>
                  <Link to="/admin" id="admin">Admin</Link>
                  <Logout />
                </div>
              </div>
            </header>
          )
            : (
              <header>
                <div className="questioner-logo">
                  <Link to="/meetups"><img src="https://res.cloudinary.com/mchardex/image/upload/v1558174712/logo.png" alt="questioner-logo" /></Link>
                  <span>QUESTIONER</span>
                </div>
                <div className="user">
                  <i className="fas fa-user-cog" />
                  <span id="user">{username}</span>
                  <div className="dropdown-content">
                    <Link to="/profile">Profile </Link>
                    <Link to="/meetups">Meetups </Link>
                    <Logout />
                  </div>
                </div>
              </header>
            )
        }
      </div>
    );
  }
}

Header.propTypes = {
  getCurrentUser: propTypes.func.isRequired,
  meetups: propTypes.shape(propTypes.shape).isRequired,
};

const mapStateToProps = meetups => meetups;

export default connect(mapStateToProps, { getCurrentUser })(Header);
