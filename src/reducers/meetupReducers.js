import actionType from '../constants/actionTypes';

const initialState = {
  meetups: [],
  meetup: [],
  user: {},
  message: '',
  getRsvpMessage: null,
  rsvpPostSuccess: false,
  rsvpPostError: false,
  postQuestionError: false,
  userRsvp: '',
};

const meetups = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CLEAR_ERROR:
      return {
        ...state,
        rsvpPostSuccess: false,
        rsvpPostError: false,
        postQuestionError: false,
      };
    case actionType.FETCH_USER_SUCCESS:
      return {
        ...state, user: action.user,
      };
    case actionType.FETCH_USER_ERROR:
      return {
        ...state,
      };
    case actionType.FETCH_MEETUPS_SUCCESS:
      return {
        ...state, meetups: action.meetups,
      };
    case actionType.FETCH_MEETUPS_ERROR:
      return {
        ...state,
      };
    case actionType.SINGLE_MEETUP_SUCCESS:
      return {
        ...state, meetup: action.meetup,
      };
    case actionType.SINGLE_MEETUP_ERROR:
      return {
        ...state,
      };
    case actionType.RSVP_GET_SUCCESS:
      return {
        ...state, getRsvpMessage: action.rsvp,
      };
    case actionType.RSVP_POST_SUCCESS:
      return {
        ...state,
        rsvpPostSuccess: true,
        rsvpPostError: false,
        message: action.message,
        userRsvp: '',
      };
    case actionType.RSVP_POST_ERROR:
      return {
        ...state,
        rsvpPostError: true,
        rsvpPostSuccess: false,
        message: action.error,
      };
    case actionType.POST_QUESTION_SUCCESS:
      return {
        ...state,
        postQuestionError: false,
      };
    case actionType.POST_QUESTION_ERROR:
      return {
        ...state,
        postQuestionError: true,
        message: action.error,
      };
    case actionType.USER_RSVP_SUCCESS:
      return {
        ...state,
        userRsvp: action.response,
      };
    case actionType.USER_RSVP_ERROR:
      return {
        ...state,
      };
    case actionType.UPVOTE_DOWNVOTE_SUCCESS:
      return {
        ...state,
      };
    case actionType.RESET_COMPONENT_SUCCESS:
      return {
        ...state,
        userRsvp: '',
        message: '',
        meetups: [],
      };
    default:
      return state;
  }
};

export default meetups;
