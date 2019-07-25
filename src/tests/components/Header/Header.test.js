import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/Header';

jest.mock('../../../clientGraphQL/client.js');

test('should render Header without title prop and user', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Header with title prop', () => {
    const wrapper = shallow(<Header title="Moscow, Russia" />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Header with user signed in', () => {
    const wrapper = shallow(<Header user={{ email: 'test@mail.com', name: 'Test' }}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should open Signup dialog modal', () => {
    const wrapper = shallow(<Header />);
    wrapper.find('button').forEach(button => {
        
        if (button.text() === 'Signup') {
            button.simulate('click');
            expect(wrapper.state('signupIsOpen')).toBeTruthy();
        }
    
    });
});

test('should open Signin dialog modal', () => {
    const wrapper = shallow(<Header />);
    wrapper.find('button').forEach(button => {
        
        if (button.text() === 'Signin') {
            button.simulate('click');
            expect(wrapper.state('signinIsOpen')).toBeTruthy();
        }
    
    });
});