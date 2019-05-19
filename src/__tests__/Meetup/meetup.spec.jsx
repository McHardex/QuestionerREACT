import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Meetup } from '../../components/Meetup';
import mock from '../../utils/testMock';

const { meetupProps } = mock;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('meetup component', () => {
  it('snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Meetup {...meetupProps} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate click', () => {
    const wrapper = shallow(<Meetup {...meetupProps} />);
    wrapper.find('input').simulate('click', {
      target: { value: 8 },
      stopPropagation: () => {},
    });
  });

  it('should call onchange', () => {
    const wrapper = shallow(<Meetup {...meetupProps} />);
    wrapper.find('input').simulate('change', { target: { value: 'Your new Value' } });
    expect(wrapper.state('searchValue')).toBe('Your new Value');
    expect(wrapper.state('meetup')).toEqual([]);
  });
});
