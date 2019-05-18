import actionType from '../constants/actionTypes';

const initialState = {
  postMeetupError: false,
  deleteMeetupError: false,
  deleteMeetupSuccess: false,
  message: null,
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CLEAR_ERROR:
      return {
        ...state,
        postMeetupError: false,
        deleteMeetupSuccess: false,
      };
    case actionType.POST_MEETUP_SUCCESS:
      return {
        ...state, postMeetupError: false,
      };
    case actionType.POST_MEETUP_ERROR:
      return {
        ...state,
        message: action.error,
        postMeetupError: true,
      };
    case actionType.DELETE_MEETUP_SUCCESS:
      return {
        ...state,
        message: action.message,
        deleteMeetupError: false,
        deleteMeetupSuccess: true,
      };
    case actionType.FETCH_MEETUPS_ERROR:
      return {
        ...state,
        message: action.error,
        deleteMeetupError: true,
        deleteMeetupSuccess: false,
      };
    default:
      return state;
  }
};

export default admin;
