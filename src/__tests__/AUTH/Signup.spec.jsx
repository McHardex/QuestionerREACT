import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Signup } from '../../components/Signup';
import Loader from '../../components/Loader';
import DisplayMessage from '../../components/DisplayMessage';
import mock from '../../utils/testMock';

const { signupProps } = mock;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('signup', () => {
  it('snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Signup {...signupProps} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('test handle signUpUser event', () => {
    const wrapper = shallow(<Signup {...signupProps} />);
    const e = { preventDefault: jest.fn() };
    expect(wrapper.instance().signUpUser(e));
  });

  const props = {
    error: false,
    message: 'message',
    onClick: jest.fn(),
  };

  it('should render DisplayMessage', () => {
    shallow(<DisplayMessage {...props} />);
  });

  it('should render DisplayMessage', () => {
    shallow(<Loader {...props} />);
  });

  it('test handle clearError event', () => {
    const wrapper = shallow(<Signup {...signupProps} />);
    expect(wrapper.instance().clearError());
  });
});
