import { toast } from 'react-toastify';
import actionTypes from '../constants/actionTypes';
import http from '../utils/http';
import { contentLoading } from './action.helpers';

export const signUpSuccess = () => ({
  type: actionTypes.SIGNUP_SUCCESS,
});

export const signUpError = error => ({
  type: actionTypes.SIGNUP_ERROR,
  error,
});

export const loginSuccess = () => ({
  type: actionTypes.LOGIN_SUCCESS,
});

export const loginError = () => ({
  type: actionTypes.LOGIN_ERROR,
});

export const signUpUser = data => async (dispatch) => {
  dispatch(contentLoading());
  await http
    .post('/auth/signup', data)
    .then((res) => {
      const { token } = res.data.data;
      localStorage.setItem('token', JSON.stringify(token));
      dispatch(signUpSuccess(res));
      window.location = '/meetups';
    })
    .catch((err) => {
      toast.error(err.response.data.error, {
        closeButton: true,
      });
      dispatch(signUpError());
    });
};

export const loginUser = data => (dispatch) => {
  dispatch(contentLoading());
  return http
    .post('/auth/login', data)
    .then((res) => {
      const { token, user } = res.data.data[0];
      dispatch(loginSuccess(user));
      localStorage.setItem('token', JSON.stringify(token));
      window.location = '/meetups';
    })
    .catch((err) => {
      toast.error(err.response.data.error, {
        closeButton: true,
      });
      dispatch(loginError());
    });
};
