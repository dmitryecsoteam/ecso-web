import ApolloClient from 'apollo-boost';
import history from '../router/history';

export const client = new ApolloClient({
    uri: "http://194.182.70.179:4000/v1",
    onError: ({ graphQLErrors, networkError }) => {
      if (networkError || graphQLErrors) {
        //console.log(graphQLErrors);
        history.push("/error");
      }
    },
    //request: (e) => {console.log(e)}
  });