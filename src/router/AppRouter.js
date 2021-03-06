import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import MainPage from '../components/MainPage';
import HelpPage from '../components/HelpPage';
import ErrorPage from '../components/ErrorPage';
import UnauthPage from '../components/UnauthPage';
import TravelPage from '../components/TravelPage';
import NotFoundPage from '../components/NotFoundPage';
import NotificationPage from '../components/NotificationPage';
import history from './history';

const AppRouter = () => (
    <Router history={history}>
        <ScrollToTop>
            <div>
                <Switch>
                    <Route path="/" component={MainPage} exact={true} />
                    <Route path="/help" component={HelpPage} />
                    <Route path="/error" component={ErrorPage} />
                    <Route path="/unauth" component={UnauthPage} />
                    <Route path="/travel/:_id" component={TravelPage} />
                    <Route path="/notifications" component={NotificationPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </ScrollToTop>
    </Router>
);

export default AppRouter;