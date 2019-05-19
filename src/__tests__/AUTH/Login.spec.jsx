import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Login } from '../../components/Login';
import mock from '../../utils/testMock';

const { loginProps } = mock;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('login actions', () => {
  it('snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Login {...loginProps} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('test handle login event', () => {
    const wrapper = shallow(<Login {...loginProps} />);
    const e = { preventDefault: jest.fn() };
    expect(wrapper.instance().login(e));
  });

  it('test handle clearError event', () => {
    const wrapper = shallow(<Login {...loginProps} />);
    expect(wrapper.instance().clearError());
  });
});
