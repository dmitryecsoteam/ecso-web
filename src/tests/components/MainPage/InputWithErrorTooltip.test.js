import React from 'react';
import { shallow } from 'enzyme';
import InputWithErrorTooltip from '../../../components/MainPage/InputWithErrorTooltip';

test('should render InputWithErrorTooltip component with input and default props', () => {
    const wrapper = shallow(<InputWithErrorTooltip>
        <input type="text" />
    </InputWithErrorTooltip>);
    expect(wrapper).toMatchSnapshot();
});

test('should render InputWithErrorTooltip component with input', () => {
    const wrapper = shallow(<InputWithErrorTooltip
        error={false}
        errorText={null}
        label="Test"
        disabled={false}
    >
        <input type="text" />
    </InputWithErrorTooltip>);
    expect(wrapper).toMatchSnapshot();
});

test('should render InputWithErrorTooltip disabled', () => {
    const wrapper = shallow(<InputWithErrorTooltip
        error={false}
        errorText={null}
        label="Test"
        disabled={true}
    >
        <input type="text" />
    </InputWithErrorTooltip>);
    expect(wrapper).toMatchSnapshot();
});

test('should render InputWithErrorTooltip with error message', () => {
    const wrapper = shallow(<InputWithErrorTooltip
        error={true}
        errorText="Please type text"
        label="Test"
        disabled={true}
    >
        <input type="text" />
    </InputWithErrorTooltip>);
    expect(wrapper).toMatchSnapshot();
});

test('should render InputWithErrorTooltip with error message if it\'s empty string', () => {
    const wrapper = shallow(<InputWithErrorTooltip
        error={true}
        errorText=""
        label="Test"
        disabled={true}
    >
        <input type="text" />
    </InputWithErrorTooltip>);
    expect(wrapper).toMatchSnapshot();
});

test('should render InputWithErrorTooltip with hint', () => {
    const wrapper = shallow(<InputWithErrorTooltip
        error={true}
        errorText=""
        label="Test"
        disabled={true}
        hint={true}
        hintText="Test hint text"
    >
        <input type="text" />
    </InputWithErrorTooltip>);
    expect(wrapper).toMatchSnapshot();
});