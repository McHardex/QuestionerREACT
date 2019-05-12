import actionTypes from '../constants/actionTypes';
import http from '../utils/http';
import { contentLoading } from './action.helpers';

const createMeetupSuccess = () => ({
  type: actionTypes.POST_MEETUP_SUCCESS,
});

const createMeetupError = error => ({
  type: actionTypes.POST_MEETUP_ERROR,
  error,
});

// const getMeetupSuccess = () => ({
//   type: actionTypes.FETCH_MEETUP_SUCCESS,
// });

// const getMeetupError = error => ({
//   type: actionTypes.FETCH_MEETUP_ERROR,
//   error,
// });

export const clearError = () => ({
  type: actionTypes.CLEAR_ERROR,
});

export const createMeetup = (data, succesCallBack) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.post('/meetups', data)
      .then((res) => {
        dispatch(createMeetupSuccess(res));
        succesCallBack();
      })
      .catch((err) => {
        dispatch(createMeetupError(err.response.data.error));
      })
  );
});

export const updateMeetup = (id, data, succesCallBack) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.put(`/meetups/${id}`, data)
      .then((res) => {
        dispatch(createMeetupSuccess(res));
        succesCallBack();
      })
      .catch((err) => {
        dispatch(createMeetupError(err.response.data.error));
      })
  );
});
