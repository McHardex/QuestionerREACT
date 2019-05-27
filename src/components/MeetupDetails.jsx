import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import QuestionsAndComments from './QuestionsAndComments';
import { clearError } from '../actions/action.helpers';
import DisplayMessage from './DisplayMessage';
import {
  getSingleMeetup,
  getRsvp,
  postRsvp,
  getRsvpByUser,
  postQuestions,
  upvoteAndDownvoteQuestion,
  postComments,
  resetComponent,
} from '../actions/meetupDetailsActions';
import '../assets/stylesheets/meetupDetails.css';
import Loader from './Loader';

export class MeetupDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
    };
  }

  componentDidMount() {
    const {
      match, getSingleMeetup, getRsvp, getRsvpByUser,
    } = this.props;

    const { id } = match.params;

    getRsvp(id);
    getSingleMeetup(id);
    getRsvpByUser(id);
    this.setState({ id });
  }

  componentWillUnmount() {
    const { resetComponent } = this.props;
    resetComponent();
  }

  // post rsvp response
  postRsvp = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = {
      response: target.value,
    };
    const { id } = this.state;
    const { postRsvp, getRsvp } = this.props;
    postRsvp(id, data, () => getRsvp(id));
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
  upvoteQuestion = (e) => {
    e.preventDefault();
    const questionId = e.target.id;
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

  clearError = () => {
    const { clearError } = this.props;
    clearError();
  }

  render() {
    const { meetups, loader } = this.props;
    const { isLoading } = loader;
    const { meetup } = meetups;
    const {
      message,
      getRsvpMessage,
      postQuestionError,
      rsvpPostSuccess,
      userRsvp,
    } = meetups;

    const { id } = this.state;

    return (
      <div className="m-details-cont">
        { isLoading && <Loader />}
        <Header />
        <div className="m-cont">
          <div className="m-image" />
          <div className="m-text">
            <h1 id="spe-topic">{meetup[0] && meetup[0].topic}</h1>
            <div className="mdlocation">
              <i className="fas fa-map-marker-alt" />
              <p id="spe-location">{meetup[0] && meetup[0].location}</p>
            </div>
            <div className="mdrsvp">
              <i className="fas fa-users" />
              <p className="rsvps">
                {getRsvpMessage}
              </p>
            </div>
            <div className="mddate">
              <i className="fas fa-calendar-week" />
              <p id="spe-happeningOn">{new Date(meetup[0] && meetup[0].happeningon).toDateString()}</p>
            </div>
          </div>
        </div>
        <h2 className="rsvp-ques">Will you love to attend this meetup?</h2>
        <div className="rsvp-resp-buttn">
          <button
            type="submit"
            disabled={message === 'yes' || userRsvp === 'yes'}
            className={message === 'yes' || userRsvp === 'yes' ? 'disable-yes-btn' : 'yes-btn'}
            value="yes"
            onClick={this.postRsvp}
          >
            Yes
          </button>
          <button
            type="submit"
            disabled={message === 'no' || userRsvp === 'no'}
            className={message === 'no' || userRsvp === 'no' ? 'disable-no-btn' : 'no-btn'}
            value="no"
            onClick={this.postRsvp}
          >
            No
          </button>
          <button
            type="submit"
            disabled={message === 'maybe' || userRsvp === 'maybe'}
            className={message === 'maybe' || userRsvp === 'maybe' ? 'disable-maybe-btn' : 'maybe-btn'}
            value="maybe"
            onClick={this.postRsvp}
          >
            Maybe
          </button>
        </div>
        <DisplayMessage
          error={postQuestionError}
          message={message}
          onClick={this.clearError}
        />
        <DisplayMessage
          error={rsvpPostSuccess}
          message="Your response has been recorded"
          onClick={this.clearError}
        />
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
        <h1 className="disc">Discussions</h1>
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
  resetComponent: propTypes.func.isRequired,
  getRsvp: propTypes.func.isRequired,
  getRsvpByUser: propTypes.func.isRequired,
  getSingleMeetup: propTypes.func.isRequired,
  postQuestions: propTypes.func.isRequired,
  upvoteAndDownvoteQuestion: propTypes.func.isRequired,
  postComments: propTypes.func.isRequired,
  clearError: propTypes.func.isRequired,
  match: propTypes.shape(propTypes.objectOf).isRequired,
  loader: propTypes.shape().isRequired,
};

const mapStateToProps = ({ meetups, loader }) => ({ meetups, loader });

export default connect(mapStateToProps, {
  getSingleMeetup,
  getRsvp,
  postRsvp,
  postQuestions,
  upvoteAndDownvoteQuestion,
  postComments,
  clearError,
  getRsvpByUser,
  resetComponent,
})(MeetupDetails);
