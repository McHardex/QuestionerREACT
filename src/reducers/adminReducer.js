import actionType from '../constants/actionTypes';

const initialState = {
  contentloading: false,
  postMeetupError: null,
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CONTENT_LOADING:
      return {
        ...state, contentLoading: true,
      };
    case actionType.POST_MEETUP_SUCCESS:
      return {
        ...state, contentloading: false,
      };
    case actionType.POST_MEETUP_ERROR:
      return {
        ...state, postMeetupError: action.error, contentloading: false,
      };
    default:
      return state;
  }
};

export default admin;
