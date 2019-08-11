import React from 'react';
import Header from '../Header';
import SearchForm from './SearchForm';
import ResultsPanel from './ResultsPanel';
import BestDeals from './BestDeals';



export default () => (
    <div>
        <div className="main-header">
            <Header />
            <div className="main-header__background">
                <img className="main-header__background-image" src="/images/background/background.jpg" alt="Background image Mount Fuji" />
            </div>
        </div>

        <SearchForm />

        <ResultsPanel />

        <BestDeals />
    </div>
);
