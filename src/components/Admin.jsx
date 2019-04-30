import React, { Component } from 'react';
import '../assets/stylesheets/admin.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from './Header';
import Label from './Label';
import { getCurrentUser, getAllMeetups } from '../actions/meetupActions';


class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: null,
      length: null,
      meetup: null,
    };
  }


  onChange = (e) => {
    e.preventDefault();
    // window.scroll({ bottom: '50%', right: 0, behavior: 'smooth' });
    const searchContent = e.target.value.toLowerCase();
    const { meetups } = this.props;
    const searchResult = meetups.meetups.filter(meetup => (
      meetup.topic.toLowerCase().includes(searchContent)
      || meetup.location.toLowerCase().includes(searchContent)
      || meetup.tags.join(' ').toLowerCase().includes(searchContent)
    ));

    this.setState({
      searchValue: e.target.value,
      length: searchResult.length,
      meetup: searchResult,
    });
  }

  componentDidMount = () => {
    const {
      getCurrentUser, getAllMeetups,
    } = this.props;
    getCurrentUser();
    getAllMeetups();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      meetup: nextProps.meetups.meetups,
    });
  }

  render() {
    const { meetups } = this.props;
    const { user } = meetups;
    const { isAdmin, username } = user;
    const { meetup, length, searchValue } = this.state;

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
          <div className="cte-meetup-cont">
            <form className="create-meetup" id="create-meetup">
              <Label htmlFor="topic">Topic</Label>
              <input className="form-input" name="topic" type="text" required />
              <Label htmlFor="date">Date</Label>
              <input className="form-input empty" name="happeningOn" type="date" required />
              <Label htmlFor="location">Location</Label>
              <input className="form-input" name="location" type="text" required />
              <Label htmlFor="tags">Tags</Label>
              <div className="tags-cont">
                <input className="form-input tags" name="tags[]" type="text" required />
                <input className="form-input tags" name="tags[]" type="text" required />
                <input className="form-input tags" name="tags[]" type="text" required />
              </div>
              <button type="submit" className="submit-form">Create Meetup</button>
            </form>
          </div>
          <hr />
          <div className="search-cont">
            <input
              type="text"
              name="search"
              autoComplete="on"
              placeholder="Search meetup by title, location or tags"
              className="search-meetup"
              onChange={this.onChange}
              tabIndex="-2"
            />
          </div>
          <div id="overlay" />
          <div className="meetups" id="meetups" />
        </div>
        {/* form edit */}
        {/* <div className="form-edit-cont" id="modal">
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
        </div> */}
        {length === 0
          ? (
            <div className="meetups">
              <p className="not-found">
                Sorry, we could not find any meetups matching
                {' '}
                {`"${searchValue}"`}
              </p>
            </div>
          )
          : (
            <div className="meetups" id="meetups">
              {
                meetup && meetup.map(meetup => (
                  <Link to={`/meetups/${meetup.id}`} className="link" key={meetup.id}>
                    <div
                      className="meetup-cont"
                      role="presentation"
                      key={meetup.id}
                    >
                      <div className="meetup-text">
                        <p className="date">{new Date(meetup.happeningon).toDateString()}</p>
                        <h3 id={meetup.id} className="meetup-topic">{meetup.topic}</h3>
                        <p className="loctn">{meetup.location}</p>
                        <span>{meetup.tags.join(' ')}</span>
                      </div>
                      <i className="fas fa-trash" title="delete" id={meetup.id} />
                      <i className="far fa-edit" title="edit" id={meetup.id} />
                    </div>
                  </Link>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}


Admin.propTypes = {
  getCurrentUser: propTypes.func.isRequired,
  getAllMeetups: propTypes.func.isRequired,
  meetups: propTypes.shape.isRequired,
};

const mapStateToProps = ({ admin, meetups }) => ({ admin, meetups });

export default connect(mapStateToProps, { getCurrentUser, getAllMeetups })(Admin);
