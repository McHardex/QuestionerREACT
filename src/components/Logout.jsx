import React, { Component } from 'react';

class Logout extends Component {
  logout = () => {
    localStorage.clear();
    window.location = '/login';
  }

  render() {
    return <p className="logout" onClick={this.logout} onKeyDown={this.logout} role="presentation">logout</p>;
  }
}

export default Logout;
