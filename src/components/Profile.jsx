/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../actions/meetupActions';
import {
  getQuestionsCount,
  getCommentsCount,
  getUpcomingMeetups,
  updateProfile,
} from '../actions/profileActions';
import Header from './Header';
import EditProfileModal from './EditProfileModal';
import Loader from './Loader';
import '../assets/stylesheets/profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  async componentDidMount() {
    const {
      getCurrentUser,
      getQuestionsCount,
      getCommentsCount,
      getUpcomingMeetups,
    } = this.props;
    await getCurrentUser();
    await getUpcomingMeetups();
    const { meetups } = this.props;
    const { user } = meetups;
    getCommentsCount(user.id);
    getQuestionsCount(user.id);
    console.log(user, '-----');
  }

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  updateProfile = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = {};
    const formData = new FormData(target);
    for (const entry of formData.entries()) {
      const [keys, values] = entry;
      data[keys] = values;
    }
    const { updateProfile, getCurrentUser } = this.props;
    updateProfile(data, () => {
      this.toggleModal();
      getCurrentUser();
    });
  };

  render() {
    const { meetups, profile, loader } = this.props;
    const { isLoading } = loader;
    console.log(isLoading);
    const { user } = meetups;
    const { upcomingMeetups } = profile;
    const {
      firstname, email, lastname, username, othername,
    } = user;

    const { showModal } = this.state;

    return (
      <div className="admin-cont">
        <Header />
        {isLoading && <Loader />}
        <div className="profile-wrapper">
          {showModal ? (
            <EditProfileModal
              firstname={firstname}
              lastname={lastname}
              username={username}
              othername={othername}
              closeModal={this.toggleModal}
              submitForm={this.updateProfile}
            />
          ) : (
            <div className="profile-details">
              <table>
                <tbody>
                  <tr>
                    <th>Profile</th>
                  </tr>
                  <tr>
                    <td>Firstname:</td>
                    <td className="name">{`${firstname || 'N/A'}`}</td>
                  </tr>
                  <tr>
                    <td>Lastname:</td>
                    <td className="name">{`${lastname || 'N/A'}`}</td>
                  </tr>
                  <tr>
                    <td>Othername:</td>
                    <td className="name">{`${othername || 'N/A'}`}</td>
                  </tr>
                  <tr>
                    <td>Username:</td>
                    <td className="name">{username}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td className="email">{email}</td>
                  </tr>
                </tbody>
              </table>
              <i className="fas fa-user-edit" onClick={this.toggleModal} />
            </div>
          )}
          <div className="activities">
            <table>
              <tbody>
                <tr>
                  <th>Activities</th>
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
        </div>
        <hr />
        <h1 className="up-header">Upcoming Meetups</h1>
        <div className="meetups" id="meetups">
          {upcomingMeetups
            && upcomingMeetups.map(meetup => (
              <div className="meetup-wrap-landing-page" key={meetup.id}>
                <Link
                  to={`/meetups/${meetup.id}`}
                  className="link"
                  key={meetup.id}
                >
                  <div
                    className="meetup-cont"
                    role="presentation"
                    key={meetup.id}
                  >
                    <div className="meetup-text">
                      <div className="meet-img">
                        <img
                          src="https://res.cloudinary.com/mchardex/image/upload/v1558174712/logo.png"
                          alt="questioner-logo"
                        />
                      </div>
                      <p className="date">
                        {new Date(meetup.happeningon).toDateString()}
                      </p>
                      <h3 id={meetup.id} className="meetup-topic">
                        {meetup.topic}
                      </h3>
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
            ))}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentUser: propTypes.func.isRequired,
  getQuestionsCount: propTypes.func.isRequired,
  getCommentsCount: propTypes.func.isRequired,
  updateProfile: propTypes.func.isRequired,
  getUpcomingMeetups: propTypes.func.isRequired,
  meetups: propTypes.shape({
    username: propTypes.string,
  }).isRequired,
  profile: propTypes.shape({}).isRequired,
  loader: propTypes.shape({}).isRequired,
};

const mapStateToProps = ({ meetups, profile, loader }) => ({
  meetups,
  profile,
  loader,
});
export default connect(
  mapStateToProps,
  {
    getCurrentUser,
    getQuestionsCount,
    getCommentsCount,
    getUpcomingMeetups,
    updateProfile,
  },
)(Profile);
