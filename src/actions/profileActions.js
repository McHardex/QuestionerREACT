import actionTypes from '../constants/actionTypes';
import contentLoading from './contentLoading';
import http from '../lib/http';

export const getQuestionCountSuccess = count => ({
  type: actionTypes.USER_QUESTION_COUNT_SUCCESS,
  count,
});

export const getQuestionCountError = error => ({
  type: actionTypes.USER_QUESTION_COUNT_ERROR,
  error,
});

export const getCommentCount = count => ({
  type: actionTypes.USER_COMMENT_COUNT_SUCCESS,
  count,
});

export const getUpcomingMeetupsSuccess = upcoming => ({
  type: actionTypes.FETCH_UPCOMING_MEETUP_SUCCESS,
  upcoming,
});

export const getUpcomingMeetupsError = error => ({
  type: actionTypes.FETCH_UPCOMING_MEETUP_ERROR,
  error,
});

// get total no of questions that has been posted by the user
export const getQuestionsCount = userId => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.get('/questions')
      .then((res) => {
        const questionCount = res.data.data.filter(question => question.createdby === userId);
        dispatch(getQuestionCountSuccess(questionCount.length));
      })
      .catch((res) => {
        dispatch(getQuestionCountError(res.response.data.error));
      })
  );
});

// get total no of comments by the user
export const getCommentsCount = userId => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.get(`comments/${userId}`)
      .then((res) => {
        const commentCount = res.data.data.length;
        dispatch(getCommentCount(commentCount));
      })
      .catch(() => {
        dispatch(getCommentCount(0));
      })
  );
});

// get all upcoming meetups
export const getUpcomingMeetups = data => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.get('/meetups', data)
      .then((res) => {
        dispatch(getUpcomingMeetupsSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(getUpcomingMeetupsError(err.response.data.error));
      })
  );
});
