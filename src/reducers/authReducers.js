import actionType from '../constants/actionTypes';

const initialState = {
  errorMessage: null,
  signupSuccess: false,
  signupError: false,
  loginError: false,
  redirect: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CLEAR_ERROR:
      return {
        ...state, signupError: false, loginError: false,
      };
    case actionType.SIGNUP_SUCCESS:
      return {
        ...state, signupError: false, signupSuccess: true,
      };
    case actionType.SIGNUP_ERROR:
      return {
        ...state, errorMessage: action.error, signupError: true,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state, loginError: false, redirect: true,
      };
    case actionType.LOGIN_ERROR:
      return {
        ...state, errorMessage: action.error, loginError: true,
      };
    default:
      return state;
  }
};

export default auth;
