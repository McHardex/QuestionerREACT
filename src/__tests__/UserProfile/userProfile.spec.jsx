import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Profile } from '../../components/Profile';
import mock from '../../utils/testMock';

const { profileProps } = mock;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('profile component', () => {
  it('snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Profile {...profileProps} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call clearError', () => {
    const getCurrentUser = jest.fn();
    shallow(<Profile {...profileProps} />);
    expect(getCurrentUser).not.toHaveBeenCalled();
  });
});
