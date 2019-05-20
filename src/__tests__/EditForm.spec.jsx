import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { EditForm } from '../components/EditForm';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('EditForm component', () => {
  const props = {
    closeEditModal: jest.fn(),
    updateMeetup: jest.fn(),
    singleMeetup: [
      { happeningon: '2019-04-16T14:49:26.699Z' },
      { happeningon: '2019-04-16T14:49:26.699Z' },
    ],
  };

  it('snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <EditForm {...props} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleAddition method', () => {
    const wrapper = shallow(<EditForm {...props} />);
    expect(wrapper.instance().handleAddition());
  });

  it('should call handleDelete method', () => {
    const wrapper = shallow(<EditForm {...props} />);
    expect(wrapper.instance().handleDelete());
  });

  it('should call handleDrag method', () => {
    const wrapper = shallow(<EditForm {...props} />);
    expect(wrapper.instance().handleDrag());
  });

  it('should call handleTag1 method', () => {
    const wrapper = shallow(<EditForm {...props} />);
    const e = { preventDefault: jest.fn(), target: { value: 'val' } };
    expect(wrapper.instance().handleTag1(e));
  });

  it('should call handleTag2 method', () => {
    const wrapper = shallow(<EditForm {...props} />);
    const e = { preventDefault: jest.fn(), target: { value: 'val' } };
    expect(wrapper.instance().handleTag2(e));
  });

  it('should call handleTag3 method', () => {
    const wrapper = shallow(<EditForm {...props} />);
    const e = { preventDefault: jest.fn(), target: { value: 'val' } };
    expect(wrapper.instance().handleTag3(e));
  });
});
