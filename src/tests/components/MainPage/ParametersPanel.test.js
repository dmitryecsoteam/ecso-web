import React from 'react';
import { mount } from 'enzyme';
import ParametersPanel from '../../../components/MainPage/ParametersPanel';
import Parameter from '../../../components/MainPage/Parameter';


let props, onChange, parametersOnClick;

beforeEach(() => {

    onChange = jest.fn();
    parametersOnClick = jest.fn();

    // default props
    props = {
        parametersPanel: false,
        errorParameters: false,
        parametersEntered: 0,
        parametersMax: 6,
        parametersValue: {
            Beach: 0,
            Food: 0,
            Museum: 0,
            Nature: 0,
            Nightlife: 0,
            Shopping: 0
        },
        onChange,
        parametersOnClick
    };
});

test('should render ParametersPanal with default props', () => {
    const wrapper = mount(<ParametersPanel {...props} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ParametersPanel with opened panel', () => {
    props.parametersPanel = true;
    const wrapper = mount(<ParametersPanel {...props} />);
    expect(wrapper).toMatchSnapshot();
});

test('should open panel on click', () => {
    const wrapper = mount(<ParametersPanel {...props} />);
    wrapper.find('.parameters-panel__open-close-btn').simulate('click');
    expect(parametersOnClick).toHaveBeenCalled();
});

test('should pass onChange function for each Parameter as prop', () => {
    props.parametersPanel = true;
    const wrapper = mount(<ParametersPanel {...props} />);
    wrapper.find(Parameter).forEach((param) => {
        expect(param.props().onChange).toEqual(onChange);
    });
});

test('should display error message', () => {
    props.parametersPanel = true;
    props.errorParameters = true;
    const wrapper = mount(<ParametersPanel {...props} />);
    expect(wrapper).toMatchSnapshot();
});