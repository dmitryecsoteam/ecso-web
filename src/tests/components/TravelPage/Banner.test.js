import React from 'react';
import { shallow } from 'enzyme';
import Banner from '../../../components/TravelPage/Banner';

test('should render Banner component', () => {
    const wrapper = shallow(<Banner
        linkTo="#"
        backgroundImage="test image"
        textMain="main text here"
        textSecondary="secondary text here"
        textButton="button"
    />);
    expect(wrapper).toMatchSnapshot();
});