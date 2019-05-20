import actionTypes from '../../constants/actionTypes';
import admin from '../../reducers/adminReducer';

describe('admin reducers', () => {
  it('should return the initial state', () => {
    expect(admin(undefined, {})).toEqual({
      postMeetupError: false,
      deleteMeetupError: false,
      deleteMeetupSuccess: false,
      message: null,
    });
  });

  it('CLEAR_ERROR', () => {
    expect(
      admin({}, {
        type: actionTypes.CLEAR_ERROR,
      }),
    ).toEqual({
      postMeetupError: false,
      deleteMeetupSuccess: false,
    });
  });

  it('POST_MEETUP_SUCCESS', () => {
    expect(
      admin({}, {
        type: actionTypes.POST_MEETUP_SUCCESS,
      }),
    ).toEqual({
      postMeetupError: false,
    });
  });

  it('should handle POST_MEETUP_ERROR', () => {
    expect(
      admin({}, {
        type: actionTypes.POST_MEETUP_ERROR,
        error: 'error',
      }),
    ).toEqual({
      message: 'error',
      postMeetupError: true,
    });
  });

  it('should handle DELETE_MEETUP_SUCCESS', () => {
    expect(
      admin({}, {
        type: actionTypes.DELETE_MEETUP_SUCCESS,
        message: 'deleted',
      }),
    ).toEqual({
      message: 'deleted',
      deleteMeetupError: false,
      deleteMeetupSuccess: true,
    });
  });

  it('should handle FETCH_MEETUPS_ERROR', () => {
    expect(
      admin({}, {
        type: actionTypes.FETCH_MEETUPS_ERROR,
        error: 'error',
      }),
    ).toEqual({
      message: 'error',
      deleteMeetupError: true,
      deleteMeetupSuccess: false,
    });
  });
});
