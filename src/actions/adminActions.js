import actionTypes from '../constants/actionTypes';
import http from '../utils/http';
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
      .catch((err) => {
        console.log(err.response.data.error);
        dispatch(createMeetupError(err.response.data.error));
      })
  );
});
