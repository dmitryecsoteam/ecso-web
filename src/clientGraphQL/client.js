import ApolloClient from 'apollo-boost';
import history from '../router/history';

const errors = ['User with email', 'Wrong password', 'Such notification already exists', 'doesn\'t have notification with id'
//,'Unauthorized'
];
const authErrors = ['Unauthorized', 'jwt expired'];
const jwtErrors = ['invalid', 'Unexpected', 'jwt malformed'];

export const client = new ApolloClient({
  //uri: "http://194.182.70.179:4000/v1",
  uri: "http://localhost:4000/v1",
  onError: (error) => {

    console.log(error)

    const { graphQLErrors, networkError } = error;

    // 1. All network errors redirect to ErrorPage
    if (networkError) {
      history.push("/error");
    } 

    // 2. Authentication errors: reset token in localStorage
    else if (graphQLErrors && (authErrors.some(err => graphQLErrors[0].message.includes(err)))) {
      localStorage.setItem("token", "");
      //client.resetStore();

    }

    // 3. Errors related to corrupted JWT: reset token and redirect to home page
    else if (graphQLErrors && (jwtErrors.some(err => graphQLErrors[0].message.includes(err)))) {
      localStorage.setItem("token", "");
      client.resetStore();
      history.push("/");
    } 
    
    // 4. Redirect to ErrorPage except errors in array
    else if (graphQLErrors && (!errors.some(err => graphQLErrors[0].message.includes(err)))) {
      history.push("/error");
    }

  },
  // fetchOptions: {
  //   credentials: 'include'
  // },
  request: (operation) => {
    console.log('request', operation)
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});