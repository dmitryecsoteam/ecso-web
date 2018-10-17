import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from '../components/MainPage';
import HelpPage from '../components/HelpPage';
import Header from '../components/Header/index';

export default () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={MainPage} exact={true} />
                <Route path="/help" component={HelpPage} />
            </Switch>
        </div>
    </BrowserRouter>
);