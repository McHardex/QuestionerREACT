import React from 'react';
import { shallow } from 'enzyme';
import Logout from '../components/Logout';

describe('Logout component', () => {
  it('snapshot', () => {
    const wrapper = shallow(
      <Logout />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call logout method', () => {
    const wrapper = shallow(<Logout />);
    expect(wrapper.instance().logout());
  });
});
