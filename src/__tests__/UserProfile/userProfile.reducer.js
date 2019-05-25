import actionTypes from '../../constants/actionTypes';
import profile from '../../reducers/profileReducer';

describe('profile reducers', () => {
  it('should return the initial state', () => {
    expect(profile(undefined, {})).toEqual({
      questionCount: 0,
      commentCount: 0,
      upcomingMeetups: [],
      updateUserError: '',
    });
  });

  it('USER_QUESTION_COUNT_SUCCESS', () => {
    expect(
      profile({}, {
        type: actionTypes.USER_QUESTION_COUNT_SUCCESS,
        count: 1,
      }),
    ).toEqual({
      questionCount: 1,
    });
  });

  it('USER_COMMENT_COUNT_SUCCESS', () => {
    expect(
      profile({}, {
        type: actionTypes.USER_COMMENT_COUNT_SUCCESS,
        count: 1,
      }),
    ).toEqual({
      commentCount: 1,
    });
  });

  it('should handle FETCH_UPCOMING_MEETUP_SUCCESS', () => {
    expect(
      profile({}, {
        type: actionTypes.FETCH_UPCOMING_MEETUP_SUCCESS,
        upcoming: [{ title: 'title' }],
      }),
    ).toEqual({
      upcomingMeetups: [{ title: 'title' }],
    });
  });

  it('should handle FETCH_UPCOMING_MEETUP_error', () => {
    expect(
      profile({}, {
        type: actionTypes.FETCH_UPCOMING_MEETUP_error,
        error: 'error',
      }),
    ).toEqual({
      error: 'error',
    });
  });

  it('should handle UPDATE_USER_PROFILE_SUCESS', () => {
    expect(
      profile({}, {
        type: actionTypes.UPDATE_USER_PROFILE_SUCESS,
      }),
    ).toEqual({});
  });

  it('should handle UPDATE_USER_PROFILE_ERROR', () => {
    expect(
      profile({}, {
        type: actionTypes.UPDATE_USER_PROFILE_ERROR,
        error: 'error',
      }),
    ).toEqual({
      error: 'error',
    });
  });
});
