import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import Router from './router/AppRouter';
import configureStore from './store/ReduxStore';
import { Provider } from 'react-redux';

// Imports for react-dates: https://github.com/airbnb/react-dates
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { TEST_CONNECTION_QUERY } from './queries/queries';
import { client } from './clientGraphQL/client';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <Router />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));


// client.query({
//     query: TEST_CONNECTION_QUERY,
//     variables: { _id: 0 }
// }).then((result) => {
//     console.log(result);
// });