import gql from 'graphql-tag';

export const SIGNUP_USER = gql`
mutation signupUser($email: String, $password: String, $name: String){
    signupUser (email: $email, password: $password, name: $name) {
        token
    }
}
`;