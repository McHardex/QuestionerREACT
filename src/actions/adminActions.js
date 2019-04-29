import actionTypes from '../constants/actionTypes';
import http from '../lib/http';
import contentLoading from './contentLoading';

export const createMeetupSuccess = () => ({
  type: actionTypes.POST_MEETUP_SUCCESS,
});

export const createMeetupError = error => ({
  type: actionTypes.POST_MEETUP_ERROR,
  error,
});


export const createMeetup = (data, succesCallBack) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.post('/meetups', data)
      .then((res) => {
        dispatch(createMeetupSuccess(res));
        succesCallBack();
      })
      .catch((res) => {
        dispatch(createMeetupError(res.response.data.error));
      })
  );
});
