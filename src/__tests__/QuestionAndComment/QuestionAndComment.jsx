import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { QuestionsAndComments } from '../../components/QuestionsAndComments';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('meetupDetails component', () => {
  const props = {
    data: [{ title: 'title', questionId: 2 }],
    upvote: jest.fn(),
    comment: jest.fn(),
  };
  it('snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <QuestionsAndComments {...props} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate change', () => {
    const wrapper = shallow(<QuestionsAndComments {...props} />);
    wrapper.find('input').simulate('change', { target: { value: 'Your new Value' } });
    expect(wrapper.find('input')).toEqual({});
  });
});
