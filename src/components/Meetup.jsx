import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from './Header';
import Loader from './Loader';
import { getAllMeetups } from '../actions/meetupActions';
import '../assets/stylesheets/meetup.css';

export class Meetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: null,
      length: null,
      meetup: null,
    };
  }

  componentDidMount = () => {
    const { getAllMeetups } = this.props;
    getAllMeetups();
  }

  onChange = (e) => {
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


  render() {
    const { loader } = this.props;
    const { isLoading } = loader;
    const { meetup, length, searchValue } = this.state;

    return (
      <div className="admin-cont">
        {isLoading && <Loader />}
        <Header />
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
            )
          }
        </div>
      </div>
    );
  }
}

Meetup.propTypes = {
  meetups: propTypes.shape({
    meetups: propTypes.arrayOf(propTypes.shape),
  }).isRequired,
  loader: propTypes.shape({
    isLoading: propTypes.bool,
  }).isRequired,
  getAllMeetups: propTypes.func.isRequired,
};

const mapStateToProps = ({ meetups, loader }) => ({ meetups, loader });

export default connect(mapStateToProps, { getAllMeetups })(Meetup);
