import React from 'react';
import Header from '../Header';
import SearchForm from './SearchForm';
import ResultsPanel from './ResultsPanel';

import background from '../../images/background/background4.jpg';
import { Session } from '../../auth/session';

export default () => (
    <div>
        <div className="main-header">
            <Session>
                {({ user, fetchUser }) => (
                    <Header user={user} fetchUser={fetchUser} />
                )}
            </Session>
            <div className="main-header__background">
                <img className="main-header__background-image" src={background} alt="Background image Mount Fuji" />
            </div>
        </div>

        <SearchForm />

        <ResultsPanel />
    </div>
);