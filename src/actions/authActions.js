import actionTypes from '../constants/actionTypes';
import http from '../utils/http';
import { contentLoading } from './action.helpers';

const signUpSuccess = () => ({
  type: actionTypes.SIGNUP_SUCCESS,
});

const signUpError = error => ({
  type: actionTypes.SIGNUP_ERROR,
  error,
});

const loginSuccess = () => ({
  type: actionTypes.LOGIN_SUCCESS,
});

const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

export const signUpUser = (data, succesCallBack) => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.post('/auth/signup', data)
      .then((res) => {
        dispatch(signUpSuccess(res));
        succesCallBack();
      })
      .catch((res) => {
        dispatch(signUpError(res.response.data.error));
      })
  );
});

export const loginUser = data => ((dispatch) => {
  dispatch(contentLoading());
  return (
    http.post('/auth/login', data)
      .then((res) => {
        const { token, user } = res.data.data[0];
        dispatch(loginSuccess(user));
        localStorage.setItem('token', JSON.stringify(token));
        window.location = './meetups';
      })
      .catch((err) => {
        dispatch(loginError(err.response.data.error));
      })
  );
});
