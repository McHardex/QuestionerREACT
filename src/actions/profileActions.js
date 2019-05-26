import actionTypes from '../constants/actionTypes';
import { contentLoading } from './action.helpers';
import http from '../utils/http';

const getQuestionCountSuccess = count => ({
  type: actionTypes.USER_QUESTION_COUNT_SUCCESS,
  count,
});

const getQuestionCountError = error => ({
  type: actionTypes.USER_QUESTION_COUNT_ERROR,
  error,
});

const getCommentCount = count => ({
  type: actionTypes.USER_COMMENT_COUNT_SUCCESS,
  count,
});

const getUpcomingMeetupsSuccess = upcoming => ({
  type: actionTypes.FETCH_UPCOMING_MEETUP_SUCCESS,
  upcoming,
});

const getUpcomingMeetupsError = error => ({
  type: actionTypes.FETCH_UPCOMING_MEETUP_ERROR,
  error,
});

const updateUserSucess = () => ({
  type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
});

const updateUserError = error => ({
  type: actionTypes.UPDATE_USER_PROFILE_ERROR,
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

// update user profile
export const updateProfile = (data, successCallBack) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.patch('/user', data)
      .then(() => {
        successCallBack();
        dispatch(updateUserSucess());
      })
      .catch((err) => {
        dispatch(updateUserError(err.response));
      })
  );
});
