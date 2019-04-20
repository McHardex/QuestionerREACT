import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from './Header';
import Loader from './Loader';
import { getAllMeetups } from '../actions/meetupActions';
import '../assets/stylesheets/meetup.css';

class Meetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: null,
      length: null,
      loading: true,
      meetup: null,
    };
  }

  // fetchSuccess = () => {
  //   this.setState({ loading: false });
  // }

  componentDidMount = () => {
    const { getAllMeetups } = this.props;
    getAllMeetups();
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
      loading: nextProps.meetups.isLoading,
      meetup: nextProps.meetups.meetups,
    });
  }

  render() {
    const { meetups } = this.props;
    const {
      meetup, loading, length, searchValue,
    } = this.state;

    console.log(length);
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
        {loading && <Loader />}
        <Header role={isAdmin} username={username} />
        <div className="cont">
          <div className="create-meetup-bk">
            <div className="banner-text">
              <h1>Find a Meetup</h1>
              <p>Find past and upcoming meetups</p>
            </div>
          </div>

          <form className="search-bar" id="search-bar">
            <input type="text" onChange={this.onChange} name="search" autoComplete="on" placeholder="Search Meetup by title, location or tags" className="search-meetup" tabIndex="-2" />
          </form>
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
                    <div className="meetup-cont" id={meetup.id} key={meetup.id}>
                      <div className="meetup-text" id={meetup.id}>
                        <p>{new Date(meetup.happeningon).toDateString()}</p>
                        <h3 id={meetup.id} className="meetup-topic">{meetup.topic}</h3>
                        <p>
                          {meetup.location}
                        </p>
                        <span>{meetup.tags.join(' ')}</span>
                      </div>
                    </div>
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
  getAllMeetups: propTypes.func.isRequired,
};

const mapStateToProps = meetups => meetups;
export default connect(mapStateToProps, { getAllMeetups })(Meetup);
