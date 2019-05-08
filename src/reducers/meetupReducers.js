import actionType from '../constants/actionTypes';

const initialState = {
  meetups: [],
  meetup: [],
  user: {},
  message: null,
  getRsvpMessage: null,
  rsvpPostSuccess: false,
  rsvpPostError: false,
  postQuestionError: false,
  isLoading: false,
};

const meetups = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CONTENT_LOADING:
      return {
        ...state, isLoading: true,
      };
    case actionType.CLEAR_ERROR:
      return {
        ...state,
        rsvpPostSuccess: false,
        rsvpPostError: false,
        postQuestionError: false,
      };
    case actionType.FETCH_USER_SUCCESS:
      return {
        ...state, user: action.user, isLoading: false,
      };
    case actionType.FETCH_USER_ERROR:
      return {
        ...state, isLoading: false,
      };
    case actionType.FETCH_MEETUPS_SUCCESS:
      return {
        ...state, meetups: action.meetups, isLoading: false,
      };
    case actionType.FETCH_MEETUPS_ERROR:
      return {
        ...state, isLoading: false,
      };
    case actionType.SINGLE_MEETUP_SUCCESS:
      return {
        ...state, meetup: action.meetup, isLoading: false,
      };
    case actionType.SINGLE_MEETUP_ERROR:
      return {
        ...state, isLoading: false,
      };
    case actionType.RSVP_GET_SUCCESS:
      return {
        ...state, isLoading: false, getRsvpMessage: action.rsvp,
      };
    case actionType.RSVP_POST_SUCCESS:
      return {
        ...state,
        rsvpPostSuccess: true,
        isLoading: false,
        rsvpPostError: false,
        message: action.message,
      };
    case actionType.RSVP_POST_ERROR:
      return {
        ...state,
        rsvpPostError: true,
        isLoading: false,
        rsvpPostSuccess: false,
        message: action.error,
      };
    case actionType.POST_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postQuestionError: false,
      };
    case actionType.POST_QUESTION_ERROR:
      return {
        ...state,
        isLoading: false,
        postQuestionError: true,
        message: action.error,
      };
    case actionType.UPVOTE_DOWNVOTE_SUCCESS:
      return {
        ...state, upvoteDownvoteSuccess: action.upvote, isLoading: false,
      };
    default:
      return state;
  }
};

export default meetups;
