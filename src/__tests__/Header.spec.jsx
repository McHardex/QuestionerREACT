import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Header } from '../components/Header';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('Header component', () => {
  const props = {
    getCurrentUser: jest.fn(),
    meetups: {
      meetups: {
        user: { isAdmin: true, username: 'bukunmi' },
      },
    },
  };

  it('snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Header {...props} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('cdm', () => {
    shallow(<Header {...props} />);
    const spy = jest.spyOn(Header.prototype, 'componentDidMount');
    expect(spy).toHaveBeenCalled();
  });
});
