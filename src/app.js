import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/AppRouter';
//import history from './router/history';
import configureStore from './store/ReduxStore';
import { Provider } from 'react-redux';
import { ApolloProvider } from "react-apollo";

// Import styles
import './styles/styles.scss';
import 'normalize.css';



// Imports for react-dates: https://github.com/airbnb/react-dates
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

// Import for default styling for react-input-range: https://github.com/davidchin/react-input-range
import 'react-input-range/lib/css/index.css'

import { TEST_CONNECTION_QUERY } from './queries/queries';
import { client } from './clientGraphQL/client';

const store = configureStore();

const jsx = (
    <ApolloProvider client={client} >
        <Provider store={store} >
            <Router />
        </Provider>
    </ApolloProvider>
);


ReactDOM.render(jsx, document.getElementById('app'));


// client.query({
//     query: TEST_CONNECTION_QUERY,
//     variables: { _id: 0 }
// }).then((result) => {
//     console.log(result);
// });