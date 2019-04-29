import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from './Header';
import Loader from './Loader';
import { getAllMeetups, getCurrentUser } from '../actions/meetupActions';
import '../assets/stylesheets/meetup.css';

class Meetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: null,
      length: null,
      meetup: null,
    };
  }

  componentDidMount = () => {
    const { getAllMeetups, getCurrentUser } = this.props;
    getAllMeetups();
    getCurrentUser();
  }

  onChange = (e) => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
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

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      meetup: nextProps.meetups.meetups,
    });
  }

  componentWillUnmount = () => {
    this.state.meetup = null;
  }

  render() {
    const { meetups } = this.props;
    const { contentLoading, user } = meetups;
    const { isAdmin, username } = user;
    const { meetup, length, searchValue } = this.state;

    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      return (
        <Redirect to="/login" />
      );
    }
    return (
      <div className="admin-cont">
        {contentLoading && <Loader />}
        <Header role={isAdmin} username={username} />
        <div className="cont">
          <div className="create-meetup-bk">
            <div className="banner-text">
              <h1>Find a Meetup</h1>
              <p>Find past and upcoming meetups</p>
            </div>
          </div>
          <div className="search-cont">
            <input
              type="text"
              onChange={this.onChange}
              name="search"
              autoComplete="on"
              placeholder="Search Meetup by title, location or tags"
              className="search-meetup"
              tabIndex="-2"
            />
          </div>
          <div id="overlay" />
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
                      </div>
                    </Link>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

Meetup.propTypes = {
  meetups: propTypes.shape({
    contentLoading: propTypes.bool,
    meetups: propTypes.arrayOf(propTypes.shape),
  }).isRequired,
  getAllMeetups: propTypes.func.isRequired,
  getCurrentUser: propTypes.func.isRequired,
};

const mapStateToProps = meetups => meetups;
export default connect(mapStateToProps, { getAllMeetups, getCurrentUser })(Meetup);
