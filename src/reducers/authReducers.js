import actionType from '../constants/actionTypes';

const initialState = {
  user: {},
  signUpSuccess: false,
  error: false,
  signUpError: null,
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
    default:
      return state;
  }
};

export default auth;
