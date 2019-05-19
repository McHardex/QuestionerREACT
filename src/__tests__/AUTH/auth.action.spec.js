import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  signUpSuccess,
  signUpError,
  loginSuccess,
  loginError,
  signUpUser,
  loginUser,
} from '../../actions/authActions';
import actionTypes from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  afterEach(() => {
    fetchMock.restore();
    fetchMock.config.fallbackToNetwork = false;
  });

  it('should create an action on successfully signup', async () => {
    const expectedAction = [
      {
        type: actionTypes.SIGNUP_SUCCESS,
      },
    ];
    const store = mockStore({});

    await store.dispatch(signUpSuccess());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on signup error', async () => {
    const expectedAction = [
      {
        type: actionTypes.SIGNUP_ERROR,
        error: 'error',
      },
    ];
    const store = mockStore({});
    const error = 'error';
    store.dispatch(signUpError(error));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on successfully login', async () => {
    const expectedAction = [
      {
        type: actionTypes.LOGIN_SUCCESS,
      },
    ];
    const store = mockStore({});

    await store.dispatch(loginSuccess());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on login error', async () => {
    const expectedAction = [
      {
        type: actionTypes.LOGIN_ERROR,
        error: 'error',
      },
    ];
    const store = mockStore({});
    const error = 'error';
    store.dispatch(loginError(error));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on signup', async () => {
    fetchMock.mock(
      '/api/v1/auth/signup',
      {
        status: 200,
      },
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    await fetch('/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const expectedAction = [
      {
        type: 'CONTENT_LOADING',
      },
      {
        type: actionTypes.SIGNUP_ERROR,
      },
    ];

    const store = mockStore({});

    await store.dispatch(signUpUser());
    expect(store.getActions()).toMatchObject(expectedAction);
  });

  it('should create an action on login', async () => {
    fetchMock.mock(
      '/api/v1/auth/login',
      {
        status: 200,
      },
      {
        method: 'POST',
      },
    );

    await fetch('/api/v1/auth/login', {
      method: 'POST',
    });

    const expectedAction = [
      {
        type: 'CONTENT_LOADING',
      },
      {
        type: actionTypes.LOGIN_ERROR,
      },
    ];

    const store = mockStore({});

    await store.dispatch(loginUser());
    expect(store.getActions()).toMatchObject(expectedAction);
  });
});
