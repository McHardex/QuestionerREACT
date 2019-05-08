import actionType from '../constants/actionTypes';

const initialState = {
  errorMessage: null,
  signupSuccess: false,
  signupError: false,
  loginError: false,
  isLoading: false,
  redirect: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CONTENT_LOADING:
      return {
        ...state, isLoading: true,
      };
    case actionType.CLEAR_ERROR:
      return {
        ...state, signupError: false, loginError: false,
      };
    case actionType.SIGNUP_SUCCESS:
      return {
        ...state, isLoading: false, signupError: false, signupSuccess: true,
      };
    case actionType.SIGNUP_ERROR:
      return {
        ...state, errorMessage: action.error, isLoading: false, signupError: true,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state, isLoading: false, loginError: false, redirect: true,
      };
    case actionType.LOGIN_ERROR:
      return {
        ...state, errorMessage: action.error, loginError: true, isLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
