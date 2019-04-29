import actionType from '../constants/actionTypes';

const initialState = {
  questionCount: 0,
  commentCount: 0,
  contentLoading: false,
  upcomingMeetups: [],
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CONTENT_LOADING:
      return {
        ...state, contentLoading: true,
      };
    case actionType.USER_QUESTION_COUNT_SUCCESS:
      return {
        ...state, questionCount: action.count, contentLoading: false,
      };
    case actionType.USER_COMMENT_COUNT_SUCCESS:
      return {
        ...state, commentCount: action.count, contentLoading: false,
      };
    case actionType.FETCH_UPCOMING_MEETUP_SUCCESS:
      return {
        ...state, upcomingMeetups: action.upcoming, contentLoading: false,
      };
    case actionType.FETCH_UPCOMING_MEETUP_error:
      return {
        ...state, error: action.error, contentLoading: false,
      };
    default:
      return state;
  }
};

export default profile;
