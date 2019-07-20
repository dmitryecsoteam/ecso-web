import ApolloClient from 'apollo-boost';
import history from '../router/history';

const errors = ['User with email', 'Wrong password'];

export const client = new ApolloClient({
    //uri: "http://194.182.70.179:4000/v1",
    uri: "http://localhost:4000/v1",
    onError: ({ graphQLErrors, networkError }) => {

      if (networkError) {
        history.push("/error");
      }

      if (!errors.some(err => graphQLErrors[0].message.includes(err))) {
        history.push("/error");
      }

      // if (!graphQLErrors[0].message.includes('User with email')) {
      //   history.push("/error");
      // }
    },
    //request: (e) => {console.log(e)}
  });