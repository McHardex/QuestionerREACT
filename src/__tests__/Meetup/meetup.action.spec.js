import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  getAllMeetups,
  getCurrentUser,
} from '../../actions/meetupActions';
import actionTypes from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('meetup actions', () => {
  beforeEach(() => {
    fetchMock.restore();
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action on getting meetups', async () => {
    fetchMock.mock(
      '/api/v1/auth/meetups',
      {
        status: 200,
      },
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    await fetch('/api/v1/auth/meetups', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const expectedAction = [
      {
        type: 'CONTENT_LOADING',
      },
      {
        type: actionTypes.FETCH_MEETUPS_SUCCESS,
      },
    ];

    const store = mockStore({});
    await store.dispatch(getAllMeetups());
    expect(store.getActions()).toMatchObject(expectedAction);
  });

  it('should create an action on error getting current user success', async () => {
    fetchMock.mock(
      '/api/v1/auth/user',
      {
        status: 200,
      },
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    await fetch('/api/v1/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const expectedAction = [
      {
        type: 'CONTENT_LOADING',
      },
      {
        type: actionTypes.FETCH_USER_ERROR,
        error: 'jwt malformed',
      },
    ];

    const store = mockStore({});

    const error = 'jwt malformed';
    await store.dispatch(getCurrentUser(error));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
