import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import Router from './router/AppRouter';
import configureStore from './store/ReduxStore';
import { Provider } from 'react-redux';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <Router />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));