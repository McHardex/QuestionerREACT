import actionTypes from '../constants/actionTypes';
import contentLoading from './contentLoading';
import http from '../lib/http';

// get single meetups success and error response
export const getSingleMeetupSuccess = meetup => ({
  type: actionTypes.SINGLE_MEETUP_SUCCESS,
  meetup,
});

export const getSingleMeetupError = error => ({
  type: actionTypes.SINGLE_MEETUP_ERROR,
  error,
});

// get rsvp fetch success and length
export const getRsvpSuccess = rsvp => ({
  type: actionTypes.RSVP_GET_SUCCESS,
  rsvp,
});

// rsvp on a specific meetup
export const rsvpPostMessage = rsvp => ({
  type: actionTypes.RSVP_POST_SUCCESS,
  rsvp,
});


export const postQuestionSuccess = question => ({
  type: actionTypes.POST_QUESTION_SUCCESS,
  question,
});

export const postQuestionError = error => ({
  type: actionTypes.POST_QUESTION_ERROR,
  error,
});


export const likeSuccess = upvote => ({
  type: actionTypes.UPVOTE_DOWNVOTE_SUCCESS,
  upvote,
});

export const postCommentSuccess = comment => ({
  type: actionTypes.POST_COMMENT_SUCCESS,
  comment,
});

export const postCommentError = error => ({
  type: actionTypes.POST_COMMENT_ERROR,
  error,
});


export const getSingleMeetup = id => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.get(`/meetups/${id}`)
      .then((res) => {
        dispatch(getSingleMeetupSuccess(res.data.data));
      })
      .catch((res) => {
        dispatch(getSingleMeetupError(res.response.data.error));
      })
  );
});

// fetch all rsvps for specific meetup
export const getRsvp = meetupID => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.get(`/rsvps/${meetupID}`)
      .then((res) => {
        const { length } = res.data.data;
        if (!length || length === 0) {
          dispatch(getRsvpSuccess('No one is coming yet'));
        } else if (length === 1 || length <= 30) {
          dispatch(getRsvpSuccess(`${length} RSVP(s)... Keep it moving`));
        } else {
          dispatch(getRsvpSuccess(`${length} RSVP(s)... Great!!!`));
        }
      })
      .catch(() => {
        dispatch(getRsvpSuccess('No one is coming yet'));
      })
  );
});

// // rsvp on a meetup
export const postRsvp = (meetupID, data, clearSuccessOrErrorMessage) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.post(`/meetups/${meetupID}/rsvps`, data)
      .then(() => {
        dispatch(rsvpPostMessage('Your response has been recorded'));
        clearSuccessOrErrorMessage();
      })
      .catch((err) => {
        dispatch(rsvpPostMessage(err.response.data.error));
        clearSuccessOrErrorMessage();
      })
  );
});

// post questions on a particular meetup
export const postQuestions = (data, successCallback) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.post('/questions', data)
      .then((res) => {
        dispatch(postQuestionSuccess(res.status));
        successCallback();
      })
      .catch((err) => {
        dispatch(postQuestionError(err.response.data.error));
      })
  );
});

// upvote and downvote a particular question
export const upvoteAndDownvoteQuestion = (questionId, successCallback) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.patch(`questions/${questionId}/upvote`)
      .then((res) => {
        dispatch(likeSuccess(res.data.data[0].votes));
        successCallback();
      })
      .catch((err) => {
        throw new Error(err);
      })
  );
});


// post comments on a particular question
export const postComments = (data, successCallback) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.post('/comments', data)
      .then((res) => {
        dispatch(postCommentSuccess(res.status));
        successCallback();
      })
      .catch((err) => {
        dispatch(postCommentError(err));
      })
  );
});
