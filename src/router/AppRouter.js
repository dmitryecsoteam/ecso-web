import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import MainPage from '../components/MainPage';
import HelpPage from '../components/HelpPage';
import Header from '../components/Header/index';
import ErrorPage from '../components/ErrorPage';
import history from './history';

export default () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={MainPage} exact={true} />
                <Route path="/help" component={HelpPage} />
                <Route path="/error" component={ErrorPage} />
            </Switch>
        </div>
    </Router>
);