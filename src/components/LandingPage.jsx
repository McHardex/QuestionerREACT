
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getAllMeetups } from '../actions/meetupActions';
import Loader from './Loader';
import '../assets/stylesheets/landingPage.css';

class LandingPage extends Component {
  componentDidMount = () => {
    const { getAllMeetups } = this.props;
    getAllMeetups();
  }

  render() {
    const { loading, meetups } = this.props;
    const { meetups: meetup } = meetups;
    const { loader: isLoading } = loading;

    return (
      <div className="landing-pg">
        <header>
          { isLoading && <Loader /> }
          <div className="header-cont">
            <div className="nav1">
              <div className="questioner-logo">
                <img src="https://res.cloudinary.com/mchardex/image/upload/v1558174712/logo.png" alt="questioner-logo" />
                <span>QUESTIONER</span>
              </div>
            </div>
            <div className="nav2">
              <div className="header-utilities">
                <Link to="/signup" className="get-started">Get Started</Link>
                <Link to="/login" className="login">Log in</Link>
              </div>
            </div>
          </div>
        </header>
        <div className="lp-bk-img">
          <div className="welcom-note">
            <h1>
              <span className="wel-title">Questioner</span>
              is a place where you can
              find meetups and do more of what matters to you. Ask questions and tap
              from the knowledge of intelligent people all over the world, equip
              yourself to grow faster than your feet can run and build support
              systems for youself...
            </h1>
          </div>
        </div>
        <div className="explore">
          <h1 className="header-title-meet">Available Meetups</h1>
          <div className="meetups" id="meetups">
            {
              meetup && meetup.map(meetup => (
                <div className="meetup-wrap-landing-page" key={meetup.id}>
                  <Link to={`/meetups/${meetup.id}`} className="link" key={meetup.id}>
                    <div
                      className="meetup-cont"
                      role="presentation"
                      key={meetup.id}
                    >
                      <div className="meetup-text">
                        <div className="meet-img">
                          <img src="https://res.cloudinary.com/mchardex/image/upload/v1558174712/logo.png" alt="questioner-logo" />
                        </div>
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
          <div className="people">
            <div className="peo-details">
              <h1 className="mil-peo">Connect with millions of people</h1>
              <p>Who share the same passion with you</p>
              <p>No more boring weekends</p>
              <h2 className="schedule">Make a life out of your boring schedule</h2>
              <div className="now">
                <Link to="signup">Get Started Now</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="how-cont">
          <h2 className="how">How Questioner Works</h2>
          <div className="wrap">
            <div className="find">
              <div className="search-icon">
                <i className="fas fa-search" />
              </div>
              <div className="details">
                <h2>Find a Meetup</h2>
                <p>Discover local meetups for all the things you love</p>
                <Link to="signup">Sign up</Link>
              </div>
            </div>
            <div className="ask">
              <div className="add-icon">
                <i className="fas fa-plus" />
              </div>
              <div className="details">
                <h2>Find out More</h2>
                <p>Ask questions and stay updated with your favorite meetup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  meetups: propTypes.shape({
    meetups: propTypes.arrayOf(propTypes.shape),
  }).isRequired,
  loading: propTypes.shape({
    loader: propTypes.bool,
  }).isRequired,
  getAllMeetups: propTypes.func.isRequired,
};

const mapStateToProps = ({ meetups, loading }) => ({ meetups, loading });

export default connect(mapStateToProps, { getAllMeetups })(LandingPage);
