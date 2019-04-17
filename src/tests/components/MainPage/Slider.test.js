import React from 'react';
import { shallow } from 'enzyme';
import Slider from '../../../components/MainPage/Slider';

test('should render Slider with standart props', () => {
    const wrapper = shallow(<Slider
        max={5}
        min={0}
        steps={1}
        value={2}
        disabled={false}
        onChange={() => {}}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should change state value on direct input change', () => {
    
})