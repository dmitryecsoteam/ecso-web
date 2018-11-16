import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import MainPage from '../components/MainPage';
import HelpPage from '../components/HelpPage';
import Header from '../components/Header/index';
import ErrorPage from '../components/ErrorPage';
import TravelPage from '../components/TravelPage';
import NotFoundPage from '../components/NotFoundPage';
import history from './history';

import { BrowserRouter } from 'react-router-dom';

export default () => (
    <Router history={history}>

        <div>
            <Header />
            <Switch>
                <Route path="/" component={MainPage} exact={true} />
                <Route path="/help" component={HelpPage} />
                <Route path="/error" component={ErrorPage} />
                <Route path="/travel/:_id" component={TravelPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>

);