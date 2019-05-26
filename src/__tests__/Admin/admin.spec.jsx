import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Admin } from '../../components/Admin';
import mock from '../../utils/testMock';

const { adminProps } = mock;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('Admin component', () => {
  it('snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Admin {...adminProps} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleTagDelete method', () => {
    const wrapper = shallow(<Admin {...adminProps} />);
    expect(wrapper.instance().handleTagDelete());
  });

  it('should call handleAddition method', () => {
    const wrapper = shallow(<Admin {...adminProps} />);
    expect(wrapper.instance().handleAddition());
  });

  it('should call handleDrag method', () => {
    const wrapper = shallow(<Admin {...adminProps} />);
    expect(wrapper.instance().handleDrag());
  });

  it('should call searchMeetups method', () => {
    const wrapper = shallow(<Admin {...adminProps} />);
    const e = { preventDefault: jest.fn(), target: { value: 'cald' } };
    expect(wrapper.instance().searchMeetups(e));
  });

  it('should call editMeetup method', () => {
    const wrapper = shallow(<Admin {...adminProps} />);
    expect(wrapper.instance().editMeetup());
    expect(wrapper.state('editable')).toBe(false);
  });

  it('should call openEditModal method', () => {
    const wrapper = shallow(<Admin {...adminProps} />);
    const e = { preventDefault: jest.fn() };
    expect(wrapper.instance().openEditModal(e));
  });

  it('should call closeEditModal method', () => {
    const wrapper = shallow(<Admin {...adminProps} />);
    expect(wrapper.instance().closeEditModal());
  });

  it('should call deleteMeetup method', () => {
    const wrapper = shallow(<Admin {...adminProps} />);
    expect(wrapper.instance().deleteMeetup());
  });

  it('should call clearError method', () => {
    const wrapper = shallow(<Admin {...adminProps} />);
    expect(wrapper.instance().clearError());
  });
});
