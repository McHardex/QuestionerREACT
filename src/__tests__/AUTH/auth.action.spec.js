import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  signUpUser,
  loginUser,
} from '../../actions/authActions';
import actionTypes from '../../constants/actionTypes';
import mock from '../../utils/testMock';

const { signupPayload, login } = mock;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  beforeEach(() => {
    fetchMock.restore();
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action on signup error', async () => {
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
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on signup success', async () => {
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
        type: actionTypes.SIGNUP_SUCCESS,
      },
    ];

    const store = mockStore({});

    await store.dispatch(signUpUser(signupPayload, jest.fn()));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on login success', async () => {
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
        type: actionTypes.LOGIN_SUCCESS,
      },
    ];

    const store = mockStore({});

    await store.dispatch(loginUser(login));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on login error', async () => {
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
    expect(store.getActions()).toEqual(expectedAction);
  });
});
