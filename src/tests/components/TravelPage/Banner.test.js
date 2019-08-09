import React from 'react';
import { mount } from 'enzyme';
import Banner from '../../../components/TravelPage/Banner';

test('should render Banner component', () => {
    const wrapper = mount(<Banner
        linkTo="#"
        backgroundImage="test image"
        textMain="main text here"
        textSecondary="secondary text here"
        textButton="button"
    />);
    expect(wrapper).toMatchSnapshot();
});