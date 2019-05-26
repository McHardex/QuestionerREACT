import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  createMeetup,
  updateMeetup,
  deleteMeetup,
} from '../../actions/adminActions';
import actionTypes from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('admin actions', () => {
  beforeEach(() => {
    fetchMock.restore();
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action on error creating meetup', async () => {
    fetchMock.mock(
      '/api/v1/meetups',
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

    await fetch('/api/v1/meetups', {
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
        type: actionTypes.POST_MEETUP_ERROR,
        error: 'jwt malformed',
      },
    ];

    const store = mockStore({});

    const error = 'jwt malformed';
    await store.dispatch(createMeetup(error));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on ERROR updating meetup ', async () => {
    fetchMock.mock(
      '/api/v1/meetups/1',
      {
        status: 200,
      },
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    await fetch('/api/v1/meetups/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const expectedAction = [
      {
        type: 'CONTENT_LOADING',
      },
      {
        type: actionTypes.POST_MEETUP_ERROR,
        error: 'jwt malformed',
      },
    ];

    const store = mockStore({});

    const error = 'erjwt malformedror';
    await store.dispatch(updateMeetup(error));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on delete meetup error ', async () => {
    fetchMock.mock(
      '/api/v1/meetups/1',
      {
        status: 200,
      },
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    await fetch('/api/v1/meetups/1', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const expectedAction = [
      {
        type: 'CONTENT_LOADING',
      },
      {
        type: actionTypes.DELETE_MEETUP_ERROR,
        error: 'jwt malformed',
      },
    ];

    const store = mockStore({});

    const error = 'jwt malformed';
    await store.dispatch(deleteMeetup(error));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
