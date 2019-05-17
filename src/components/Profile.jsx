import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../actions/meetupActions';
import { getQuestionsCount, getCommentsCount, getUpcomingMeetups } from '../actions/profileActions';
import Header from './Header';
import '../assets/stylesheets/profile.css';

class Profile extends Component {
  componentDidMount = async () => {
    const {
      getCurrentUser,
      getQuestionsCount,
      getCommentsCount,
      getUpcomingMeetups,
    } = this.props;

    await getCurrentUser();
    const { meetups } = this.props;
    const { user } = meetups;
    getQuestionsCount(user.id);
    getCommentsCount(user.id);
    getUpcomingMeetups();
  }

  render() {
    const { meetups, profile } = this.props;
    const { user } = meetups;
    const { upcomingMeetups } = profile;
    const {
      isAdmin, username, firstname, email, lastname,
    } = user;

    return (
      <div className="admin-cont">
        <Header role={isAdmin} username={username} />
        <div className="profile-wrapper">
          <table>
            <tbody>
              <tr>
                <th>User details</th>
              </tr>
              <tr>
                <td>Name</td>
                <td className="name">{`${firstname} ${lastname}`}</td>
              </tr>
              <tr>
                <td>email</td>
                <td className="email">{email}</td>
              </tr>
              <tr>
                <td>No of questions posted</td>
                <td className="questions-posted">{profile.questionCount}</td>
              </tr>
              <tr>
                <td>No of questions commented on</td>
                <td className="question-comment">{profile.commentCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <h1 className="up-header">Upcoming Meetups</h1>
        <div className="meetups" id="upcoming-meetups">
          {
            upcomingMeetups && upcomingMeetups.map(meetup => (
              <div className="meetup-wrap" key={meetup.id}>
                <Link to={`/meetups/${meetup.id}`} className="link">
                  <div
                    className="meetup-cont"
                    role="presentation"
                    key={meetup.id}
                  >
                    <div className="meetup-text">
                      <p className="date">{new Date(meetup.happeningon).toDateString()}</p>
                      <h3 id={meetup.id} className="meetup-topic">{meetup.topic}</h3>
                      <p className="loctn">{meetup.location}</p>
                      <div className="tags-cont">
                        {meetup.tags.map(tag => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}


Profile.propTypes = {
  getCurrentUser: propTypes.func.isRequired,
  getQuestionsCount: propTypes.func.isRequired,
  getCommentsCount: propTypes.func.isRequired,
  getUpcomingMeetups: propTypes.func.isRequired,
  meetups: propTypes.shape({
    username: propTypes.string,
  }).isRequired,
  profile: propTypes.shape({
  }).isRequired,
};

const mapStateToProps = ({ meetups, profile }) => ({ meetups, profile });
export default connect(mapStateToProps, {
  getCurrentUser,
  getQuestionsCount,
  getCommentsCount,
  getUpcomingMeetups,
})(Profile);
