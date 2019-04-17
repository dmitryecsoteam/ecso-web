import React from 'react';
import { shallow } from 'enzyme';
import Parameter from '../../../components/MainPage/Parameter';


const testProps = {
    parameter: "Test parameter",
    value: 2,
    onChange: () => {},
    disabled: false
};

test('should render Parameter component with default props', () => {
    const wrapper = shallow(<Parameter {...testProps} />);
    expect(wrapper).toMatchSnapshot();
});

test('should pass new value in onChange function on direct input change', () => {
    const onChange = jest.fn(); 
    const wrapper = shallow(<Parameter {...{...testProps, onChange}} />);
    wrapper.find('input').simulate('change', { target: { value: 4 }});
    expect(onChange).toBeCalledWith(4, "Test parameter");
});

test('should pass new value in onChange function on label click', () => {
    const onChange = jest.fn(); 
    const wrapper = shallow(<Parameter {...{...testProps, onChange}} />);
    wrapper.find('.slider__label').at(0).simulate('click', { target: { innerHTML: "0" }});
    expect(onChange).toBeCalledWith(0, "Test parameter");
});