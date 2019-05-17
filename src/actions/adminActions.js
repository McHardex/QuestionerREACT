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

const deleteMeetupSuccess = message => ({
  type: actionTypes.DELETE_MEETUP_SUCCESS,
  message,
});

const deleteMeetupError = error => ({
  type: actionTypes.DELETE_MEETUP_ERROR,
  error,
});

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

export const deleteMeetup = (id, succesCallBack) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.delete(`/meetups/${id}`)
      .then(() => {
        dispatch(deleteMeetupSuccess('Successfully deleted this meetup!!!'));
        succesCallBack();
      })
      .catch((err) => {
        dispatch(deleteMeetupError(err.response.data.error));
      })
  );
});
