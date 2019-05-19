import actionTypes from '../../constants/actionTypes';
import auth from '../../reducers/authReducers';

describe('auth reducers', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({
      errorMessage: null,
      signupSuccess: false,
      signupError: false,
      loginError: false,
      redirect: false,
    });
  });

  it('should handle SIGNUP_SUCCESS', () => {
    expect(
      auth({}, {
        type: actionTypes.SIGNUP_SUCCESS,
      }),
    ).toEqual({
      signupError: false,
      signupSuccess: true,
    });
  });

  it('should handle.SIGNUP_ERROR', () => {
    expect(
      auth({}, {
        type: actionTypes.SIGNUP_ERROR,
        error: 'error',
      }),
    ).toEqual({
      errorMessage: 'error',
      signupError: true,
    });
  });

  it('should handle.LOGIN_SUCCESS', () => {
    expect(
      auth({}, {
        type: actionTypes.LOGIN_SUCCESS,
      }),
    ).toEqual({
      loginError: false,
      redirect: true,
    });
  });

  it('should handle.LOGIN_ERROR', () => {
    expect(
      auth({}, {
        type: actionTypes.LOGIN_ERROR,
        error: 'error',
      }),
    ).toEqual({
      errorMessage: 'error',
      loginError: true,
    });
  });

  it('should handle.CLEAR_ERROR', () => {
    expect(
      auth({}, {
        type: actionTypes.CLEAR_ERROR,
      }),
    ).toEqual({
      signupError: false,
      loginError: false,
    });
  });
});
