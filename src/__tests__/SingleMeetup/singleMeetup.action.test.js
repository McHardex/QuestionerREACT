import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  getSingleMeetup,
  getRsvp,
  postRsvp,
  postQuestions,
  upvoteAndDownvoteQuestion,
  postComments,
} from '../../actions/meetupDetailsActions';
import actionTypes from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('single meetup', () => {
  beforeEach(() => {
    fetchMock.restore();
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action on error getting single meetups', async () => {
    fetchMock.mock(
      '/api/v1/meetups/1',
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

    await fetch('/api/v1/meetups/1', {
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
        type: actionTypes.SINGLE_MEETUP_ERROR,
        error: 'jwt malformed',
      },
    ];

    const store = mockStore({});

    const error = 'jwt malformed';
    await store.dispatch(getSingleMeetup(error));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on getting rsvp success ', async () => {
    fetchMock.mock(
      '/api/v1/rsvps/1',
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

    await fetch('/api/v1/rsvps/1', {
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
        type: actionTypes.RSVP_GET_SUCCESS,
        rsvp: 'No one is coming yet',
      },
    ];

    const store = mockStore({});

    const rsvp = 'No one is coming yet';
    await store.dispatch(getRsvp(rsvp));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on post rsvp error ', async () => {
    fetchMock.mock(
      '/api/v1/meetups/1/rsvps',
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

    await fetch('/api/v1/meetups/1/rsvps', {
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
        type: actionTypes.RSVP_POST_ERROR,
      },
    ];

    const store = mockStore({});

    await store.dispatch(postRsvp());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on post question error ', async () => {
    fetchMock.mock(
      '/api/v1/questions',
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

    await fetch('/api/v1/questions', {
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
        type: actionTypes.POST_QUESTION_ERROR,
        error: 'jwt malformed',
      },
    ];

    const store = mockStore({});

    const error = 'jwt malformed';
    await store.dispatch(postQuestions(error));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on question upvote error ', async () => {
    fetchMock.mock(
      '/api/v1/questions/2/upvote',
      {
        status: 200,
      },
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    await fetch('/api/v1/questions/2/upvote', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const expectedAction = [
      {
        type: actionTypes.UPVOTE_DOWNVOTE_SUCCESS,
      },
    ];

    const store = mockStore({});

    await store.dispatch(upvoteAndDownvoteQuestion());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action on post comment error ', async () => {
    fetchMock.mock(
      '/api/v1/comments',
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

    await fetch('/api/v1/comments', {
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
        type: actionTypes.POST_COMMENT_ERROR,
      },
    ];

    const store = mockStore({});
    await store.dispatch(postComments({
      question_id: 2,
      comment: 'bukunmi',
    }, jest.fn()));
    expect(store.getActions()).toMatchObject(expectedAction);
  });
});
