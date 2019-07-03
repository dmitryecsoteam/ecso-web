import React from 'react';

export default ({ description, population }) => {
    return (
        <div className="textarea__container">
            <p className="textarea__description">{description}</p>
            <div>
                <p>Average population: {population}</p>
                <p className="textarea__date">Founding date: </p>
            </div>
        </div>
    );
}