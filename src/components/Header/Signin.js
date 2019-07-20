import React from 'react';
import { Mutation } from 'react-apollo';

import InputWithErrorTooltip from '../MainPage/InputWithErrorTooltip';
import { SIGNIN_USER } from '../../queries/mutations';


export default class Signin extends React.Component {
    state = {
        email: '',
        password: '',
        emailError: false,
        emailErrorText: '',
        passwordError: false,
        passwordErrorText: ''
    }

    onInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    onFormSubmit = async (event, signinUser) => {
        event.preventDefault();

        let emailError = false,
            emailErrorText = '',
            passwordError = false,
            passwordErrorText = '';

            const { email, password } = this.state;

        if (!email) {
            emailError = true;
            emailErrorText = 'Enter your email';
        }

        if (!password) {
            passwordError = true;
            passwordErrorText = 'Enter password';
        }

        this.setState({
            emailError,
            emailErrorText,
            passwordError,
            passwordErrorText
        });

        if (!(emailError || passwordError)) {
            try {

                const data = await signinUser();
                console.log(data)

            } catch (e) {

                if (e.message.includes('User with email')) {
                    this.setState({
                        emailError: true,
                        emailErrorText: e.message.replace('GraphQL error: ', '')
                    });
                }

                if (e.message.includes('Wrong password')) {
                    this.setState({
                        passwordError: true,
                        passwordErrorText: e.message.replace('GraphQL error: ', '')
                    });
                }
            }
        }
    }

    render() {

        const {
            email,
            password,
            emailError,
            emailErrorText,
            passwordError,
            passwordErrorText
        } = this.state;

        return (
            <div>
                <h2 className="signup__title">Signin with email</h2>

                <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>

                    {(signinUser, { data, loading, error }) => {

                        return (
                            <form
                                onSubmit={e => this.onFormSubmit(e, signinUser)}
                                autoComplete="off"
                            >

                                <InputWithErrorTooltip
                                    error={emailError}
                                    errorText={emailErrorText}
                                >
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        className="signup__input"
                                        onChange={this.onInputChange}
                                    />
                                </InputWithErrorTooltip>

                                <InputWithErrorTooltip
                                    error={passwordError}
                                    errorText={passwordErrorText}
                                >
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="Password"
                                        className="signup__input"
                                        onChange={this.onInputChange}
                                    />
                                </InputWithErrorTooltip>

                                <button className="search-form__submit-btn">Signin</button>
                            </form>
                        )
                    }}

                </Mutation>
            </div>
        );
    }
}