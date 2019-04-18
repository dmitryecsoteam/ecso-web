import React from 'react';
import { shallow } from 'enzyme';
import Parameter from '../../../components/MainPage/Parameter';

let wrapper, onChange;

beforeEach(() => {
    onChange = jest.fn();
    wrapper = shallow(<Parameter
        parameter="Test parameter"
        value={2}
        onChange={onChange}
        disabled={false}
    />);
});

test('should render Parameter component with default props', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should pass new value in onChange function on direct input change', () => {
    wrapper.find('input').simulate('change', { target: { value: 4 } });
    expect(onChange).toBeCalledWith(4, "Test parameter");
});

test('should pass new value in onChange function on label click', () => {
    wrapper.find('.slider__label').at(0).simulate('click', { target: { innerHTML: "0" } });
    expect(onChange).toBeCalledWith(0, "Test parameter");
});