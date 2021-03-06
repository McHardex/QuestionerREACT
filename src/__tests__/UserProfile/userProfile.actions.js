import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  getQuestionsCount,
  getCommentsCount,
  getUpcomingMeetups,
  updateProfile,
} from '../../actions/profileActions';
import actionTypes from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user profile actions', () => {
  beforeEach(() => {
    fetchMock.restore();
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action on error getting question count', async () => {
    fetchMock.mock(
      '/api/v1/questions',
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

    await fetch('/api/v1/questions', {
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
        type: actionTypes.USER_QUESTION_COUNT_ERROR,
        error: 'jwt malformed',
      },
    ];

    const store = mockStore({});

    const error = 'jwt malformed';
    await store.dispatch(getQuestionsCount(error));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on getting getComments Count error ', async () => {
    fetchMock.mock(
      '/api/v1/comments/1',
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

    await fetch('/api/v1/comments/1', {
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
        type: actionTypes.USER_COMMENT_COUNT_SUCCESS,
        count: 0,
      },
    ];

    const store = mockStore({});

    const count = 0;
    await store.dispatch(getCommentsCount(count));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on fetching upcoming meetups', async () => {
    await fetchMock.mock(
      '/api/v1/meetups/upcoming',
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

    await fetch('/api/v1/meetups/upcoming', {
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
        type: actionTypes.FETCH_UPCOMING_MEETUP_SUCCESS,
      },
    ];

    const store = mockStore({});

    await store.dispatch(getUpcomingMeetups());
    expect(store.getActions()).toMatchObject(expectedAction);
  });

  it('should create an action on update profile error', async () => {
    await fetchMock.mock(
      '/api/v1/user',
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

    await fetch('/api/v1/user', {
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
        type: actionTypes.UPDATE_USER_PROFILE_ERROR,
      },
    ];

    const store = mockStore({});

    await store.dispatch(updateProfile());
    expect(store.getActions()).toMatchObject(expectedAction);
  });
});
