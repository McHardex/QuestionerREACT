import actionType from '../constants/actionTypes';

const initialState = {
  user: {},
  signUpSuccess: false,
  error: false,
  signUpError: null,
  loginError: null,
  loginSuccess: false,
  isLoading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SIGNUP_SUCCESS:
      return {
        ...state, user: action.user, signUpSuccess: true, error: false,
      };
    case actionType.SIGNUP_ERROR:
      return {
        ...state, signUpError: action.error, error: true, signUpSuccess: false, isLoading: false,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state, user: action.user, error: false, loginSuccess: true,
      };
    case actionType.LOGIN_ERROR:
      return {
        ...state, loginError: action.error, error: true, loginSuccess: false, isLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
