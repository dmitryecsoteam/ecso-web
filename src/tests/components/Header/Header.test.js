import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../components/Header';

test('should render Header without title prop', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Header with title prop', () => {
    const wrapper = shallow(<Header title="Moscow, Russia" />);
    expect(wrapper).toMatchSnapshot();
});