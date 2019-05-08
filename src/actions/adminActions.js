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
