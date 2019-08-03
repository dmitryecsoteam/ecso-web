import React from 'react';
import Header from '../Header';
import SearchForm from './SearchForm';
import ResultsPanel from './ResultsPanel';
import BestDeals from './BestDeals';

import background from '../../images/background/background4.jpg';


export default () => (
    <div>
        <div className="main-header">
            <Header />
            <div className="main-header__background">
                <img className="main-header__background-image" src={background} alt="Background image Mount Fuji" />
            </div>
        </div>

        <SearchForm />

        <ResultsPanel />

        <BestDeals />
    </div>
);
