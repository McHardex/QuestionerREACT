import React, { Component } from 'react';
import '../assets/stylesheets/admin.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import propTypes from 'prop-types';
import Header from './Header';
import Label from './Label';
import { getCurrentUser, getAllMeetups } from '../actions/meetupActions';
import { createMeetup, clearError } from '../actions/adminActions';
import DisplayMessage from './DisplayMessage';
import Loader from './Loader';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: null,
      length: null,
      meetup: null,
      tags: [],
    };
  }

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag = (tag, currPos, newPos) => {
    const { tags: tagsInState } = this.state;
    const tags = [...tagsInState];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  }

  searchMeetups = (e) => {
    e.preventDefault();
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

  postMeetup = (e) => {
    e.preventDefault();
    const { tags } = this.state;
    const tagInputs = tags.map(tag => tag.text);
    const data = {
      tags: tagInputs,
    };
    const { target } = e;
    const formData = new FormData(target);
    for (const entry of formData.entries()) {
      const [keys, values] = entry;
      data[keys] = values;
    }

    const { createMeetup, getAllMeetups } = this.props;
    createMeetup(data, () => {
      getAllMeetups();
      target.reset();
      this.setState({ tags: [] });
    });
  }

  clearError = () => {
    const { clearError } = this.props;
    clearError();
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
    const { meetups, admin } = this.props;
    const { message, postMeetupError, isLoading } = admin;
    const { user } = meetups;
    const { isAdmin, username } = user;

    const {
      meetup, length, searchValue, tags,
    } = this.state;

    return (
      <div className="admin-cont">
        <DisplayMessage
          error={postMeetupError}
          message={message}
          onClick={this.clearError}
        />
        <Header role={isAdmin} username={username} />
        <div className="cont">
          <div className="create-meetup-bk">
            <div className="banner-text">
              <h1>Create a new Meetup</h1>
              <p>Enrich lives through open mindset and constructive discussions</p>
            </div>
          </div>
          <div className="cte-meetup-cont">
            <form className="create-meetup" id="create-meetup" onSubmit={this.postMeetup}>
              <Label htmlFor="topic">Topic</Label>
              <input className="form-input" name="topic" type="text" required />
              <Label htmlFor="date">Date</Label>
              <input className="form-input empty" name="happeningOn" type="date" required />
              <Label htmlFor="location">Location</Label>
              <input className="form-input" name="location" type="text" required />
              <Label htmlFor="tags">Tags</Label>
              <div className="tags-cont-show">
                <ReactTags
                  tags={tags}
                  labelField="text"
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  handleDrag={this.handleDrag}
                  maxLength={12}
                />
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
              onChange={this.searchMeetups}
              tabIndex="-2"
            />
          </div>
          <div id="overlay" />
          <div className="meetups" id="meetups" />
        </div>
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
                        <div className="tags-cont">
                          {meetup.tags.map(tag => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
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
        {isLoading && <Loader />}
      </div>
    );
  }
}

Admin.propTypes = {
  getCurrentUser: propTypes.func.isRequired,
  getAllMeetups: propTypes.func.isRequired,
  createMeetup: propTypes.func.isRequired,
  clearError: propTypes.func.isRequired,
  meetups: propTypes.objectOf(propTypes.shape).isRequired,
  admin: propTypes.objectOf(propTypes.shape).isRequired,
};

const mapStateToProps = ({ admin, meetups }) => ({ admin, meetups });

export default connect(mapStateToProps, {
  getCurrentUser,
  getAllMeetups,
  createMeetup,
  clearError,
})(Admin);
