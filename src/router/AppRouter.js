import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import MainPage from '../components/MainPage';
import HelpPage from '../components/HelpPage';
import ErrorPage from '../components/ErrorPage';
import TravelPage from '../components/TravelPage';
import NotFoundPage from '../components/NotFoundPage';
import history from './history';

export default () => (
    <Router history={history}>
        <ScrollToTop>
            <div>
                <Switch>
                    <Route path="/" component={MainPage} exact={true} />
                    <Route path="/help" component={HelpPage} />
                    <Route path="/error" component={ErrorPage} />
                    <Route path="/travel/:_id" component={TravelPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </ScrollToTop>
    </Router>
);