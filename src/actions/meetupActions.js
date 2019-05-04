import actionTypes from '../constants/actionTypes';
import contentLoading from './contentLoading';
import http from '../utils/http';


export const getAllMeetupsSuccess = meetups => ({
  type: actionTypes.FETCH_MEETUPS_SUCCESS,
  meetups,
});

export const getAllMeetupsError = error => ({
  type: actionTypes.FETCH_MEETUPS_ERROR,
  error,
});

export const getCurrentUserSuccess = user => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  user,
});

export const getCurrentUserError = error => ({
  type: actionTypes.FETCH_USER_ERROR,
  error,
});

// fetch all meetups
export const getAllMeetups = () => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.get('/meetups')
      .then((res) => {
        dispatch(getAllMeetupsSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(getAllMeetupsError(err.response.data.error));
      })
  );
});

export const getCurrentUser = () => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.get('/user')
      .then((res) => {
        dispatch(getCurrentUserSuccess(res.data.user));
      })
      .catch((err) => {
        dispatch(getCurrentUserError(err.response.data.error));
      })
  );
});
