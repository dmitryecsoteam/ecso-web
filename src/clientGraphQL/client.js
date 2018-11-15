import ApolloClient from 'apollo-boost';
import history from '../router/history';

export const client = new ApolloClient({
    uri: "http://localhost:4000/v1",
    onError: ({ networkError }) => {
      if (networkError) {
        history.push("/error");
      }
    }
  });