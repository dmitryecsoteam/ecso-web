import ApolloClient from 'apollo-boost';
import history from '../router/history';

const errors = ['User with email', 'Wrong password'];
const unauth = ['Unauthorized', 'jwt expired', 'invalid', 'Unexpected'];

export const client = new ApolloClient({
  //uri: "http://194.182.70.179:4000/v1",
  uri: "http://localhost:4000/v1",
  onError: (error) => {

    console.log(error)

    const { graphQLErrors, networkError } = error;

    if (networkError) {
      history.push("/error");
    } else if (graphQLErrors && (unauth.some(err => graphQLErrors[0].message.includes(err)))) {
      // if graphqlError related with jwt, push history to unauth page
      history.push("/unauth");
    } else if (graphQLErrors && (!errors.some(err => graphQLErrors[0].message.includes(err)))) {
      // push history to error page except errors in array
      history.push("/error");
    }

  },
  // fetchOptions: {
  //   credentials: 'include'
  // },
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});