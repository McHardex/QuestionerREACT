import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MeetupDetails } from '../../components/MeetupDetails';
import mock from '../../utils/testMock';

const { singleMeetupProps } = mock;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('meetupDetails component', () => {
  it('snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <MeetupDetails {...singleMeetupProps} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call clearError', () => {
    const wrapper = shallow(<MeetupDetails {...singleMeetupProps} />);
    expect(wrapper.instance().clearError());
  });

  it('should call postComment', () => {
    const wrapper = shallow(<MeetupDetails {...singleMeetupProps} />);
    expect(wrapper.instance().postComment());
  });

  it('should call upvoteQuestion', () => {
    const wrapper = shallow(<MeetupDetails {...singleMeetupProps} />);
    const e = { preventDefault: jest.fn(), target: { id: 2 } };
    expect(wrapper.instance().upvoteQuestion(e));
  });

  it('should call postQuestion', () => {
    const wrapper = shallow(<MeetupDetails {...singleMeetupProps} />);
    const e = { preventDefault: jest.fn() };
    expect(wrapper.instance().postQuestion(e));
  });
});
