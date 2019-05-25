import actionTypes from '../../constants/actionTypes';
import meetups from '../../reducers/meetupReducers';

describe('meetups reducers', () => {
  it('should return the initial state', () => {
    expect(meetups(undefined, {})).toEqual({
      meetups: [],
      meetup: [],
      user: {},
      message: '',
      userRsvp: '',
      getRsvpMessage: null,
      rsvpPostSuccess: false,
      rsvpPostError: false,
      postQuestionError: false,
    });
  });

  it('FETCH_MEETUPS_SUCCESS', () => {
    expect(
      meetups({}, {
        type: actionTypes.FETCH_MEETUPS_SUCCESS,
        meetups: { meetup: [] },
      }),
    ).toEqual({
      meetups: { meetup: [] },
    });
  });

  it('should handle FETCH_MEETUPS_ERROR', () => {
    expect(
      meetups({}, {
        type: actionTypes.FETCH_MEETUPS_ERROR,
      }),
    ).toEqual({});
  });

  it('should handle SINGLE_MEETUP_SUCCESS', () => {
    expect(
      meetups({}, {
        type: actionTypes.SINGLE_MEETUP_SUCCESS,
        meetup: [{ title: 'title' }],
      }),
    ).toEqual({
      meetup: [{ title: 'title' }],
    });
  });

  it('should handle SINGLE_MEETUP_ERROR', () => {
    expect(
      meetups({}, {
        type: actionTypes.SINGLE_MEETUP_ERROR,
      }),
    ).toEqual({});
  });

  it('should handle RSVP_GET_SUCCESS', () => {
    expect(
      meetups({}, {
        type: actionTypes.RSVP_GET_SUCCESS,
        rsvp: 'rsvp',
      }),
    ).toEqual({
      getRsvpMessage: 'rsvp',
    });
  });

  it('should handle RSVP_POST_SUCCESS', () => {
    expect(
      meetups({}, {
        type: actionTypes.RSVP_POST_SUCCESS,
        message: 'message',
      }),
    ).toEqual({
      rsvpPostSuccess: true,
      rsvpPostError: false,
      message: 'message',
      userRsvp: '',
    });
  });

  it('should handle RSVP_POST_ERROR', () => {
    expect(
      meetups({}, {
        type: actionTypes.RSVP_POST_ERROR,
        error: 'error',
      }),
    ).toEqual({
      rsvpPostError: true,
      rsvpPostSuccess: false,
      message: 'error',
    });
  });

  it('should handle POST_QUESTION_SUCCESS', () => {
    expect(
      meetups({}, {
        type: actionTypes.POST_QUESTION_SUCCESS,
      }),
    ).toEqual({
      postQuestionError: false,
    });
  });

  it('should handle POST_QUESTION_ERROR', () => {
    expect(
      meetups({}, {
        type: actionTypes.POST_QUESTION_ERROR,
        error: 'error',
      }),
    ).toEqual({
      postQuestionError: true,
      message: 'error',
    });
  });

  it('should handle UPVOTE_DOWNVOTE_SUCCESS', () => {
    expect(
      meetups({}, {
        type: actionTypes.UPVOTE_DOWNVOTE_SUCCESS,
      }),
    ).toEqual({});
  });

  it('should handle FETCH_USER_SUCCESS', () => {
    expect(
      meetups({}, {
        type: actionTypes.FETCH_USER_SUCCESS,
        user: 'adebisi',
      }),
    ).toEqual({
      user: 'adebisi',
    });
  });

  it('should handle FETCH_USER_ERROR', () => {
    expect(
      meetups({}, {
        type: actionTypes.FETCH_USER_ERROR,
      }),
    ).toEqual({});
  });

  it('should handle.CLEAR_ERROR', () => {
    expect(
      meetups({}, {
        type: actionTypes.CLEAR_ERROR,
      }),
    ).toEqual({
      rsvpPostSuccess: false,
      rsvpPostError: false,
      postQuestionError: false,
    });
  });

  it('should handle.USER_RSVP_SUCCESS', () => {
    expect(
      meetups({}, {
        type: actionTypes.USER_RSVP_SUCCESS,
        userRsvp: undefined,
      }),
    ).toEqual({
      userRsvp: undefined,
    });
  });

  it('should handle.USER_RSVP_ERROR', () => {
    expect(
      meetups({}, {
        type: actionTypes.USER_RSVP_ERROR,
      }),
    ).toEqual({});
  });

  it('should handle.RESET_COMPONENT', () => {
    expect(
      meetups({}, {
        type: actionTypes.RESET_COMPONENT,
      }),
    ).toEqual({
      userRsvp: '',
      message: '',
      meetups: [],
    });
  });
});
