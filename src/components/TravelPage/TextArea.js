import React from 'react';

export default ({ cityDescription, population, foundingDate }) => {
    return (
        <div className="text-area__leadtext-container">
            <p className="text-area__leadtext-item">{cityDescription}</p>
            <p className="text-area__leadtext-population">Average population: {population}</p>
            <p className="text-area__leadtext-date">Founding date: {foundingDate ? foundingDate : 'N/A'}</p>
        </div>
    );
}