import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const LandingPage = () => (
  <div className="landing-pg">
    <Header />
    <div className="lp-bk-img">
      <div className="welcom-note">
        <h1>
          <span className="wel-title">Questioner</span>
          {' '}
          is a place where you can
          find meetups and do more of what matters to you. Ask questions and tap
          from the knowledge of intelligent people all over the world, equip
          yourself to grow faster than your feet can run and build support
          systems for youself...
        </h1>
      </div>
    </div>
    <div className="explore">
      <div className="connect" />
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
          {/* <div className="search-icon">
            <i className="fas fa-search" />
          </div> */}
          <div className="details">
            <h2>Find a Meetup</h2>
            <p>Discover local meetups for all the things you love</p>
            <Link to="signup">Sign up</Link>
          </div>
        </div>
        <div className="ask">
          {/* <div className="add-icon">
            <i className="fas fa-plus" />
          </div> */}
          <div className="details">
            <h2>Find out More</h2>
            <p>Ask questions and stay updated with your favorite meetup</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
