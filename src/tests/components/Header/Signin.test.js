import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { GraphQLError } from 'graphql';

import Signin from '../../../components/Header/Signin';
import { SIGNIN_USER } from '../../../queries/mutations';



const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

let wrapper;

beforeEach(() => {
    const mocks = [{
        request: {
            query: SIGNIN_USER,
            variables: { email: 'test@mail.com', password: 'asdas' }
        },
        result: { data: { signinUser: { token: 'qwerty12' } } }
    }, {
        request: {
            query: SIGNIN_USER,
            variables: { email: 'doesntExist@mail.com', password: 'asdas' }
        },
        result: {
            errors: [new GraphQLError('User with email doesntExist@mail.com doesn\'t exist')],
        }
    }, {
        request: {
            query: SIGNIN_USER,
            variables: { email: 'test@mail.com', password: 'wrongPassword' }
        },
        result: {
            errors: [new GraphQLError('Wrong password')],
        }
    }];

    wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Signin />
        </MockedProvider>
    );
});

test('should render Signin component', () => {
    expect(wrapper.find(Signin)).toMatchSnapshot();
});

test('should signin user and return token', async () => {

    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'test@mail.com' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'asdas' } });

    wrapper.find('form').simulate('submit');
    await waitForAsync();
});

test('should not signin user if email doesn\'t exist', async () => {

    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'doesntExist@mail.com' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'asdas' } });

    wrapper.find('form').simulate('submit');
    await waitForAsync();

    const signin = wrapper.find(Signin);
    // Wait for setState to update
    await waitForAsync();

    expect(signin.state('emailError')).toBeTruthy;
    expect(signin.state('emailErrorText')).toEqual('User with email doesntExist@mail.com doesn\'t exist');
});

test('should not signin user if password is wrong', async () => {

    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'test@mail.com' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'wrongPassword' } });

    wrapper.find('form').simulate('submit');
    await waitForAsync();

    const signin = wrapper.find(Signin);
    // Wait for setState to update
    await waitForAsync();

    expect(signin.state('passwordError')).toBeTruthy;
    expect(signin.state('passwordErrorText')).toEqual('Wrong password');
});