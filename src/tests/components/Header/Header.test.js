import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/Header';

jest.mock('../../../clientGraphQL/client.js');

test('should render Header without title prop', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
    console.log(wrapper.debug())
});

test('should render Header with title prop', () => {
    const wrapper = shallow(<Header title="Moscow, Russia" />);
    expect(wrapper).toMatchSnapshot();
});