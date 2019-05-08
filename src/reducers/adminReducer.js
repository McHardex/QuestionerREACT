import actionType from '../constants/actionTypes';

const initialState = {
  contentloading: false,
  postMeetupError: false,
  message: null,
  isLoading: false,
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CONTENT_LOADING:
      return {
        ...state, isLoading: true,
      };
    case actionType.CLEAR_ERROR:
      return {
        ...state, postMeetupError: false,
      };
    case actionType.POST_MEETUP_SUCCESS:
      return {
        ...state, isLoading: false, postMeetupError: false,
      };
    case actionType.POST_MEETUP_ERROR:
      return {
        ...state,
        message: action.error,
        isLoading: false,
        postMeetupError: true,
      };
    default:
      return state;
  }
};

export default admin;
