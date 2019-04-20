import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';

class Meetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  render() {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      return (
        <Redirect to="/login" />
      );
    }
    const { isAdmin, username } = user;
    return (
      <div className="admin-cont">
        <Header role={isAdmin} username={username} />
        <div className="cont">
          <div className="create-meetup-bk">
            <div className="banner-text">
              <h1>Find a Meetup</h1>
              <p>Find past and upcoming meetups</p>
            </div>
          </div>

          <form className="search-bar" id="search-bar">
            <input type="text" name="search" autoComplete="on" placeholder="Search Meetup by title, location or tags" className="search-meetup" tabIndex="2" />
          </form>
          <div id="overlay" />
          <div className="meetups" id="meetups" />
        </div>
      </div>
    );
  }
}

export default Meetup;
