import axios from 'axios';
import actionTypes from '../constants/actionTypes';

const baseUrl = 'https://questioner-mchardex.herokuapp.com/api/v1/auth';

export const signUpSuccess = user => ({
  type: actionTypes.SIGNUP_SUCCESS,
  user,
});

export const signUpError = error => ({
  type: actionTypes.SIGNUP_ERROR,
  error,
});

export const signUpUser = (data, succesCallBack) => dispatch => axios.post(`${baseUrl}/signup`, data)
  .then((res) => {
    dispatch(signUpSuccess(res));
    succesCallBack();
  })
  .catch((res) => {
    dispatch(signUpError(res.response.data.error));
  });
