import React from 'react';
import { Mutation } from 'react-apollo';
import SHA256 from 'crypto-js/sha256';

import InputWithErrorTooltip from '../MainPage/InputWithErrorTooltip';
import { SIGNUP_USER } from '../../queries/mutations';


export default class Signup extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
    emailError: false,
    emailErrorText: '',
    nameError: false,
    nameErrorText: '',
    passwordError: false,
    passwordErrorText: '',
    passwordConfirmationError: false,
    passwordConfirmationErrorText: '',
  }

  onInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  onFormSubmit = async (event, signupUser) => {
    event.preventDefault();

    const { email, name, password, passwordConfirmation } = this.state;

    let emailError = false,
      emailErrorText = '',
      nameError = false,
      nameErrorText = '',
      passwordError = false,
      passwordErrorText = '',
      passwordConfirmationError = false,
      passwordConfirmationErrorText = '';

    if (!email) {
      emailError = true;
      emailErrorText = 'Enter your email';
    }

    if (!name) {
      nameError = true;
      nameErrorText = 'Enter your name';
    }

    if (!password) {
      passwordError = true;
      passwordErrorText = 'Enter password';
    }

    if (!passwordConfirmation) {
      passwordConfirmationError = true;
      passwordConfirmationErrorText = 'Confirm your password'
    } else {
      if (password !== passwordConfirmation) {
        passwordConfirmationError = true;
        passwordConfirmationErrorText = 'Passwords didn\'t match';
      }
    }

    this.setState({
      emailError,
      emailErrorText,
      nameError,
      nameErrorText,
      passwordError,
      passwordErrorText,
      passwordConfirmationError,
      passwordConfirmationErrorText,
    });



    if (!(emailError || nameError || passwordError || passwordConfirmationError)) {
      try {

        const { data } = await signupUser();
        console.log(data);

        localStorage.setItem('token', data.signupUser.token);

        this.props.fetchUser();

        if (this.props.closeModal) this.props.closeModal();

      } catch (e) {

        console.log(e)
        this.setState({
          emailError: true,
          emailErrorText: e.message.replace('GraphQL error: ', '')
        });

      }
    }


  }

  render() {

    const {
      email,
      name,
      password,
      passwordConfirmation,
      emailError,
      emailErrorText,
      nameError,
      nameErrorText,
      passwordError,
      passwordErrorText,
      passwordConfirmationError,
      passwordConfirmationErrorText,
    } = this.state;

    const passwordSHA = SHA256(password).toString();

    return (
      <div>
        <h2 className="signup__title">Signup with email</h2>

        <Mutation mutation={SIGNUP_USER} variables={{ email, password: passwordSHA, name }}>

          {(signupUser, { data, loading, error }) => {

            return (
              <form
                onSubmit={e => this.onFormSubmit(e, signupUser)}
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
                  error={nameError}
                  errorText={nameErrorText}
                >
                  <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
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

                <InputWithErrorTooltip
                  error={passwordConfirmationError}
                  errorText={passwordConfirmationErrorText}
                >
                  <input
                    type="password"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    placeholder="Confirm password"
                    className="signup__input"
                    onChange={this.onInputChange}
                  />
                </InputWithErrorTooltip>

                <button className="search-form__submit-btn">Submit</button>
              </form>);
          }}

        </Mutation>

      </div>
    );
  }
}