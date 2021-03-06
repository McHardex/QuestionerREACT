import React, { Component } from 'react';

class Logout extends Component {
  logout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };

  render() {
    return (
      <p
        className="logout"
        onClick={this.logout}
        onKeyDown={this.logout}
        role="presentation"
      >
        <i className="fas fa-sign-out-alt" />
      </p>
    );
  }
}

export default Logout;
