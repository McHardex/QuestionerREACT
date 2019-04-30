import actionTypes from '../constants/actionTypes';
import http from '../lib/http';

export const signUpSuccess = user => ({
  type: actionTypes.SIGNUP_SUCCESS,
  user,
});

export const signUpError = error => ({
  type: actionTypes.SIGNUP_ERROR,
  error,
});

export const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  user,
});

export const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

export const signUpUser = (data, succesCallBack) => dispatch => http.post('/auth/signup', data)
  .then((res) => {
    dispatch(signUpSuccess(res));
    succesCallBack();
  })
  .catch((res) => {
    dispatch(signUpError(res.response.data.error));
  });
export const loginUser = (data, succesCallBack) => dispatch => http.post('/auth/login', data)
  .then((res) => {
    const { token, user } = res.data.data[0];
    dispatch(loginSuccess(user));
    localStorage.setItem('token', JSON.stringify(token));
    succesCallBack();
  })
  .catch((res) => {
    dispatch(loginError(res.response.data.error));
  });
