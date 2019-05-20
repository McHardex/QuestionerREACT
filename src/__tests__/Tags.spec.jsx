import React from 'react';
import { shallow } from 'enzyme';
import Tags from '../components/Tags';

describe('EditForm component', () => {
  it('snapshot', () => {
    const wrapper = shallow(
      <Tags />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleAddition method', () => {
    const wrapper = shallow(<Tags />);
    expect(wrapper.instance().handleAddition());
  });

  it('should call handleDelete method', () => {
    const wrapper = shallow(<Tags />);
    expect(wrapper.instance().handleDelete());
  });

  it('should call handleDrag method', () => {
    const wrapper = shallow(<Tags />);
    expect(wrapper.instance().handleDrag());
  });
});
