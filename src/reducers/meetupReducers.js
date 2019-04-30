import actionType from '../constants/actionTypes';

const initialState = {
  meetups: [],
  meetup: [],
  user: {},
  meetupMessage: null,
  getRsvpMessage: null,
  postRsvpMessage: null,
  postQuestionMessage: null,
  postCommentMessage: null,
  contentLoading: false,
  messageStatus: false,
  upvoteDownvoteSuccess: null,
  generalError: null,
};

const meetups = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CONTENT_LOADING:
      return {
        ...state, contentLoading: true,
      };
    case actionType.FETCH_USER_SUCCESS:
      return {
        ...state, user: action.user, contentLoading: false,
      };
    case actionType.FETCH_USER_ERROR:
      return {
        ...state, generalError: action.error, contentLoading: false,
      };
    case actionType.FETCH_MEETUPS_SUCCESS:
      return {
        ...state, meetups: action.meetups, contentLoading: false, messageStatus: false,
      };
    case actionType.FETCH_MEETUPS_ERROR:
      return {
        ...state, meetupMessage: action.error, contentLoading: false,
      };
    case actionType.SINGLE_MEETUP_SUCCESS:
      return {
        ...state, meetup: action.meetup, contentLoading: false,
      };
    case actionType.SINGLE_MEETUP_ERROR:
      return {
        ...state, meetupMessage: action.error, contentLoading: false,
      };
    case actionType.RSVP_GET_SUCCESS:
      return {
        ...state, getRsvpMessage: action.rsvp, contentLoading: false,
      };
    case actionType.RSVP_POST_SUCCESS:
      return {
        ...state, postRsvpMessage: action.rsvp, messageStatus: true, contentLoading: false,
      };
    case actionType.POST_QUESTION_SUCCESS:
      return {
        ...state, postQuestionSuccessMsg: action.question, contentLoading: false,
      };
    case actionType.POST_QUESTION_ERROR:
      return {
        ...state, postQuestionMessage: action.error, contentLoading: false, messageStatus: true,
      };
    case actionType.UPVOTE_DOWNVOTE_SUCCESS:
      return {
        ...state, upvoteDownvoteSuccess: action.upvote, contentLoading: false,
      };
    case actionType.POST_COMMENT_SUCCESS:
      return {
        ...state, contentLoading: false,
      };
    case actionType.POST_COMMENT_ERROR:
      return {
        ...state, postCommentMessage: action.error, contentLoading: false, messageStatus: true,
      };
    default:
      return state;
  }
};

export default meetups;
