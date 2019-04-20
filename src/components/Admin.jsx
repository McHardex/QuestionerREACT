import React, { Component } from 'react';
import '../assets/stylesheets/admin.css';
import Header from './Header';
import Label from './Label';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  render() {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const { isAdmin, username } = user;
    return (
      <div className="admin-cont">
        <Header role={isAdmin} username={username} />
        <div className="cont">
          <div className="create-meetup-bk">
            <div className="banner-text">
              <h1>Create a new Meetup</h1>
              <p>Enrich lives through open mindset and constructive discussions</p>
            </div>
          </div>
          <p id="success">Meetup Created Successfully</p>
          <form className="create-meetup" id="create-meetup">
            <Label htmlFor="topic">Topic</Label>
            <input className="form-input" name="topic" type="text" required />
            <Label htmlFor="date">Date</Label>
            <input className="form-input empty" name="happeningOn" type="date" required />
            <Label htmlFor="location">Location</Label>
            <input className="form-input" name="location" type="text" required />
            <Label htmlFor="tags">Tags</Label>
            <input className="form-input" name="tags[]" type="text" id="tag1" required />
            <input className="form-input" name="tags[]" type="text" id="tag2" required />
            <input className="form-input" name="tags[]" type="text" id="tag3" required />
            <button type="submit" className="submit-form">Create Meetup</button>
          </form>
          <hr />

          <form className="search-bar" id="search-bar">
            <input type="text" name="search" autoComplete="on" placeholder="Search meetup by title, location or tags" className="search-meetup" tabIndex="2" />
          </form>
          <div id="overlay" />
          <div className="meetups" id="meetups" />
        </div>
        {/* form edit */}
        <div className="form-edit-cont" id="modal">
          <p id="edit-success">Meetup Updated Successfully</p>
          <form className="editform">
            <Label htmlFor="topic">Topic</Label>
            <input className="form-input" name="topic" type="text" id="topic" required />
            <Label htmlFor="date">Date</Label>
            <input className="form-input empty" name="happeningOn" id="happeningOn" type="date" required />
            <Label htmlFor="location">Location</Label>
            <input className="form-input" name="location" type="text" id="location" required />
            <Label htmlFor="tags">Tags</Label>
            <input className="form-input" name="tags[]" type="text" id="edit-tag1" required />
            <input className="form-input" name="tags[]" type="text" id="edit-tag2" required />
            <input className="form-input" name="tags[]" type="text" id="edit-tag3" required />
            <button type="submit" className="update-form">Update Meetup</button>
            <span className="close-div" id="closeModal">X</span>
          </form>
        </div>
      </div>
    );
  }
}

export default Admin;
