import actionTypes from '../constants/actionTypes';
import http from '../lib/http';


export const fetchAllSuccess = meetups => ({
  type: actionTypes.ALL_MEETUPS_SUCCESS,
  meetups,
});

export const fetchAllError = error => ({
  type: actionTypes.ALL_MEETUPS_ERROR,
  error,
});

export const getAllMeetups = data => dispatch => http.get('/meetups', data)
  .then((res) => {
    dispatch(fetchAllSuccess(res.data.data));
  })
  .catch((res) => {
    dispatch(fetchAllError(res.response.data.error));
  });
