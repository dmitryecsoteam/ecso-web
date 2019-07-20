import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { GraphQLError } from 'graphql';

import Signup from '../../../components/Header/Signup';
import { SIGNUP_USER } from '../../../queries/mutations';


const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

let wrapper;
beforeEach(() => {
    const mocks = [{
        request: {
            query: SIGNUP_USER,
            variables: { email: 'test@mail.com', password: 'asdas', name: 'Alex' }
        },
        result: { data: { signupUser: { token: 'qwerty12' } } }
    }, {
        request: {
            query: SIGNUP_USER,
            variables: { email: 'exists@mail.com', password: 'asdas', name: 'Alex' }
        },
        result: {
            errors: [new GraphQLError('User with email exists@mail.com already exists')],
          }
    }];

    wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Signup />
        </MockedProvider>
    );
});




test('should render Signup component', () => {
    expect(wrapper.find(Signup)).toMatchSnapshot();
});

test('should signup new user and return token', async () => {

    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'test@mail.com' } });
    wrapper.find('[name="name"]').simulate('change', { target: { name: 'name', value: 'Alex' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'asdas' } });
    wrapper.find('[name="passwordConfirmation"]').simulate('change', { target: { name: 'passwordConfirmation', value: 'asdas' } });

    wrapper.find('form').simulate('submit');
    await waitForAsync();

    // wrapper.update();
    // console.log(wrapper.find(Signup).state())
});

test('should not signup user with existing email', async () => {

    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'exists@mail.com' } });
    wrapper.find('[name="name"]').simulate('change', { target: { name: 'name', value: 'Alex' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'asdas' } });
    wrapper.find('[name="passwordConfirmation"]').simulate('change', { target: { name: 'passwordConfirmation', value: 'asdas' } });

    wrapper.find('form').simulate('submit');
    await waitForAsync();


    const signup = wrapper.find(Signup);
    //Wait for setState to update
    await waitForAsync();
    expect(signup.state('emailError')).toBeTruthy();
    expect(signup.state('emailErrorText')).toEqual('User with email exists@mail.com already exists');
});

test('should not submit form without email', () => {

    wrapper.find('[name="name"]').simulate('change', { target: { name: 'name', value: 'Alex' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'asdas' } });
    wrapper.find('[name="passwordConfirmation"]').simulate('change', { target: { name: 'passwordConfirmation', value: 'asdas' } });

    wrapper.find('form').simulate('submit');

    const signup = wrapper.find(Signup);
    expect(signup.state('emailError')).toBeTruthy();
    expect(signup.state('emailErrorText')).toEqual('Enter your email');
});

test('should not submit form without name', () => {

    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'test@mail.com' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'asdas' } });
    wrapper.find('[name="passwordConfirmation"]').simulate('change', { target: { name: 'passwordConfirmation', value: 'asdas' } });

    wrapper.find('form').simulate('submit');

    const signup = wrapper.find(Signup);
    expect(signup.state('nameError')).toBeTruthy();
    expect(signup.state('nameErrorText')).toEqual('Enter your name');
});

test('should not submit form without password', () => {

    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'test@mail.com' } });
    wrapper.find('[name="name"]').simulate('change', { target: { name: 'name', value: 'Alex' } });
    wrapper.find('[name="passwordConfirmation"]').simulate('change', { target: { name: 'passwordConfirmation', value: 'asdas' } });

    wrapper.find('form').simulate('submit');

    const signup = wrapper.find(Signup);
    expect(signup.state('passwordError')).toBeTruthy();
    expect(signup.state('passwordErrorText')).toEqual('Enter password');
});

test('should not submit form without passwordConfirmation', () => {

    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'test@mail.com' } });
    wrapper.find('[name="name"]').simulate('change', { target: { name: 'name', value: 'Alex' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'asdas' } });

    wrapper.find('form').simulate('submit');

    const signup = wrapper.find(Signup);
    expect(signup.state('passwordConfirmationError')).toBeTruthy();
    expect(signup.state('passwordConfirmationErrorText')).toEqual('Confirm your password');
});

test('should not submit form if passwords didn\'t match', () => {

    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'test@mail.com' } });
    wrapper.find('[name="name"]').simulate('change', { target: { name: 'name', value: 'Alex' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'asdas' } });
    wrapper.find('[name="passwordConfirmation"]').simulate('change', { target: { name: 'passwordConfirmation', value: 'qqqqq' } });

    wrapper.find('form').simulate('submit');

    const signup = wrapper.find(Signup);
    expect(signup.state('passwordConfirmationError')).toBeTruthy();
    expect(signup.state('passwordConfirmationErrorText')).toEqual('Passwords didn\'t match');
});