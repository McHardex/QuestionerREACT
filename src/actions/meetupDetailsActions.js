import actionTypes from '../constants/actionTypes';
import { contentLoading } from './action.helpers';
import http from '../utils/http';

// get single meetups success and error response
const getSingleMeetupSuccess = meetup => ({
  type: actionTypes.SINGLE_MEETUP_SUCCESS,
  meetup,
});

const getSingleMeetupError = error => ({
  type: actionTypes.SINGLE_MEETUP_ERROR,
  error,
});

// get rsvp fetch success and length
const getRsvpSuccess = rsvp => ({
  type: actionTypes.RSVP_GET_SUCCESS,
  rsvp,
});

// rsvp on a specific meetup
const rsvpPostSuccess = message => ({
  type: actionTypes.RSVP_POST_SUCCESS,
  message,
});
const rsvpPostError = () => ({
  type: actionTypes.RSVP_POST_ERROR,
});

const postQuestionSuccess = () => ({
  type: actionTypes.POST_QUESTION_SUCCESS,
});

const postQuestionError = error => ({
  type: actionTypes.POST_QUESTION_ERROR,
  error,
});

const likeSuccess = upvote => ({
  type: actionTypes.UPVOTE_DOWNVOTE_SUCCESS,
  upvote,
});

const likeFailure = () => ({
  type: actionTypes.UPVOTE_DOWNVOTE_SUCCESS,
});

const postCommentSuccess = () => ({
  type: actionTypes.POST_COMMENT_SUCCESS,
});

const postCommentError = error => ({
  type: actionTypes.POST_COMMENT_ERROR,
  error,
});

const userRsvpSuccess = response => ({
  type: actionTypes.USER_RSVP_SUCCESS,
  response,
});

const userRsvpError = () => ({
  type: actionTypes.USER_RSVP_ERROR,
});

export const getSingleMeetup = id => (dispatch) => {
  dispatch(contentLoading());
  return http
    .get(`/meetups/${id}`)
    .then((res) => {
      dispatch(getSingleMeetupSuccess(res.data.data));
    })
    .catch((res) => {
      dispatch(getSingleMeetupError(res.response.data.error));
    });
};

// fetch all yes rsvps for specific meetup
export const getRsvp = meetupID => (dispatch) => {
  dispatch(contentLoading());
  return http
    .get(`/rsvps/${meetupID}`)
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
    });
};

// get rsvp by the user
export const getRsvpByUser = meetupID => (dispatch) => {
  dispatch(contentLoading());
  return http
    .get(`/user/rsvp/${meetupID}`)
    .then((res) => {
      dispatch(userRsvpSuccess(res.data.data[0].response));
    })
    .catch(() => {
      dispatch(userRsvpError());
    });
};

// // rsvp on a meetup
export const postRsvp = (meetupID, data, successCallback) => (dispatch) => {
  dispatch(contentLoading());
  return http
    .post(`/meetups/${meetupID}/rsvps`, data)
    .then((res) => {
      dispatch(rsvpPostSuccess(res.data.message));
      successCallback();
    })
    .catch(() => {
      dispatch(rsvpPostError());
    });
};

// post questions on a particular meetup
export const postQuestions = (data, successCallback) => (dispatch) => {
  dispatch(contentLoading());
  return http
    .post('/questions', data)
    .then((res) => {
      dispatch(postQuestionSuccess(res.status));
      successCallback();
    })
    .catch((err) => {
      dispatch(postQuestionError(err.response.data.error));
    });
};

// upvote and downvote a particular question
export const upvoteAndDownvoteQuestion = (
  questionId,
  successCallback,
) => dispatch => http
  .patch(`questions/${questionId}/upvote`)
  .then((res) => {
    dispatch(likeSuccess(res.data.data[0].votes));
    successCallback();
  })
  .catch(() => {
    dispatch(likeFailure());
  });

// post comments on a particular question
export const postComments = (data, successCallback) => (dispatch) => {
  dispatch(contentLoading());
  return http
    .post('/comments', data)
    .then((res) => {
      dispatch(postCommentSuccess(res.status));
      successCallback();
    })
    .catch((err) => {
      dispatch(postCommentError(err));
    });
};

export const resetComponent = () => ({
  type: actionTypes.RESET_COMPONENT,
});
