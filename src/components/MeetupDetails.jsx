import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import QuestionsAndComments from './QuestionsAndComments';
import { getCurrentUser } from '../actions/meetupActions';
import { clearError } from '../actions/action.helpers';
import DisplayMessage from './DisplayMessage';
import {
  getSingleMeetup,
  getRsvp, postRsvp,
  postQuestions,
  upvoteAndDownvoteQuestion,
  postComments,
} from '../actions/meetupDetailsActions';
import '../assets/stylesheets/meetupDetails.css';
import Loader from './Loader';

class MeetupDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
    };
  }

  updateRsvp = (target) => {
    target.reset();
    const { id } = this.state;
    const { getRsvp } = this.props;
    getRsvp(id);
  }

  // post rsvp response
  postRsvp = (e) => {
    e.preventDefault();
    const data = {};
    const { target } = e;
    const formData = new FormData(target);

    for (const entry of formData.entries()) {
      const [keys, values] = entry;
      data[keys] = values;
    }
    const { id } = this.state;

    const { postRsvp } = this.props;
    postRsvp(id, data, () => this.updateRsvp(target));
  }

  // post questions
  postQuestion = (e) => {
    e.preventDefault();
    const { id } = this.state;
    const data = {
      meetup_id: id,
      body: 'we aint holding down any grudge man',
    };
    const { target } = e;
    const formData = new FormData(target);

    for (const entry of formData.entries()) {
      const [keys, values] = entry;
      data[keys] = values;
    }

    const { postQuestions, getSingleMeetup } = this.props;
    postQuestions(data, () => {
      getSingleMeetup(id);
      target.reset();
    });
  }

  // upvote and downvote a question
  upvoteQuestion = (questionId) => {
    const { id } = this.state;
    const { upvoteAndDownvoteQuestion, getSingleMeetup } = this.props;
    upvoteAndDownvoteQuestion(questionId, () => {
      getSingleMeetup(id);
    });
  }

  // post a comment
  postComment = (data) => {
    const { id } = this.state;
    const { postComments, getSingleMeetup } = this.props;
    postComments(data, () => {
      getSingleMeetup(id);
    });
  }

  componentDidMount = () => {
    const {
      match, getSingleMeetup, getRsvp, getCurrentUser,
    } = this.props;

    const { id } = match.params;

    getRsvp(id);
    getSingleMeetup(id);
    getCurrentUser();
    this.setState({ id });
  }

  componentWillUnmount = () => {
    const { meetups } = this.props;
    meetups.messageStatus = false;
  }

  clearError = () => {
    const { clearError } = this.props;
    clearError();
  }

  render() {
    const { meetups } = this.props;
    const {
      user,
      rsvpPostSuccess,
      rsvpPostError,
      message,
      isLoading,
      getRsvpMessage,
      postQuestionError,
    } = meetups;

    const { isAdmin, username } = user;

    const meetup = meetups.meetup[0];

    const { id } = this.state;

    return (
      <div className="m-details-cont">
        {isLoading && <Loader />}
        <Header role={isAdmin} username={username} />
        <div className="m-cont">
          <div className="m-image" />
          <div className="m-text">
            <h1 id="spe-topic">{meetup && meetup.topic}</h1>
            <div className="mdlocation">
              <i className="fas fa-map-marker-alt" />
              <p id="spe-location">{meetup && meetup.location}</p>
            </div>
            <div className="mdrsvp">
              <i className="fas fa-users" />
              <p className="rsvps">
                {getRsvpMessage}
              </p>
            </div>
            <div className="mddate">
              <i className="fas fa-calendar-week" />
              <p id="spe-happeningOn">{new Date(meetup && meetup.happeningon).toDateString()}</p>
            </div>
          </div>
        </div>
        <form id="rsvp-submit" type="submit" onSubmit={this.postRsvp}>
          <input
            type="text"
            className="rsvp-val"
            name="response"
            placeholder="Will you love to attend this meetup?"
            autoComplete="off"
            required
          />
          <DisplayMessage
            error={rsvpPostSuccess}
            message={message}
            onClick={this.clearError}
            successClass="success-disp-msg"
          />
          <DisplayMessage
            error={rsvpPostError}
            message={message}
            onClick={this.clearError}
          />
          <DisplayMessage
            error={postQuestionError}
            message={message}
            onClick={this.clearError}
          />
        </form>
        <form id="question-submit" onSubmit={this.postQuestion}>
          <input
            type="text"
            className="question-val"
            name="title"
            placeholder="Ask your question"
            autoComplete="off"
            required
          />
          <button type="submit" className="submit-ques">Send your question</button>
        </form>
        <hr />
        <p className="dicussions">Discussions</p>
        <QuestionsAndComments
          data={meetups.meetup}
          meetupID={id}
          upvote={this.upvoteQuestion}
          comment={this.postComment}
        />
      </div>
    );
  }
}

MeetupDetails.propTypes = {
  meetups: propTypes.shape({
    rsvpError: propTypes.string,
    rsvpLength: propTypes.number,
    messageStatus: propTypes.bool,
    postQuestionSuccessMsg: propTypes.number,
    upvoteDownvoteSuccess: propTypes.number,
  }).isRequired,
  postRsvp: propTypes.func.isRequired,
  getRsvp: propTypes.func.isRequired,
  getSingleMeetup: propTypes.func.isRequired,
  postQuestions: propTypes.func.isRequired,
  upvoteAndDownvoteQuestion: propTypes.func.isRequired,
  postComments: propTypes.func.isRequired,
  getCurrentUser: propTypes.func.isRequired,
  clearError: propTypes.func.isRequired,
  match: propTypes.shape(propTypes.objectOf).isRequired,
};

const mapStateToProps = meetups => meetups;

export default connect(mapStateToProps, {
  getSingleMeetup,
  getRsvp,
  postRsvp,
  postQuestions,
  upvoteAndDownvoteQuestion,
  postComments,
  getCurrentUser,
  clearError,
})(MeetupDetails);
