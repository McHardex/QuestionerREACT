import actionType from '../constants/actionTypes';

const initialState = {
  contentloading: false,
  postMeetupError: false,
  deleteMeetupError: false,
  deleteMeetupSuccess: false,
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
        ...state,
        postMeetupError: false,
        deleteMeetupSuccess: false,
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
    case actionType.DELETE_MEETUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        deleteMeetupError: false,
        deleteMeetupSuccess: true,
      };
    case actionType.FETCH_MEETUPS_ERROR:
      return {
        ...state,
        message: action.error,
        isLoading: false,
        deleteMeetupError: true,
        deleteMeetupSuccess: false,
      };
    default:
      return state;
  }
};

export default admin;
