import actionType from '../constants/actionTypes';

const initialState = {
  questionCount: 0,
  commentCount: 0,
  upcomingMeetups: [],
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_QUESTION_COUNT_SUCCESS:
      return {
        ...state, questionCount: action.count,
      };
    case actionType.USER_COMMENT_COUNT_SUCCESS:
      return {
        ...state, commentCount: action.count,
      };
    case actionType.FETCH_UPCOMING_MEETUP_SUCCESS:
      return {
        ...state, upcomingMeetups: action.upcoming,
      };
    case actionType.FETCH_UPCOMING_MEETUP_error:
      return {
        ...state, error: action.error,
      };
    default:
      return state;
  }
};

export default profile;
