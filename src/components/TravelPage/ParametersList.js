import React from 'react';
import { defaultState } from '../../store/ReduxStore';
import classNames from 'classnames';

export default ({ destination }) => {

    const parameters = [];
    for (let parameter in defaultState.searchForm.parametersValue) {

        const dots = [];
        for (let i = 1; i <= 5; i++) {
            const className = classNames(
                'parameters-list__dot',
                { 'parameters-list__dot--active': i <= destination[parameter.toLowerCase() + 'Rating'] }
            );
            dots.push(<span key={i} className={className}></span>);
        }

        parameters.push(<div key={parameter} className="parameters-list__parameter" data-description={destination[parameter.toLowerCase() + 'Description']}>
            <span className="parameters-list__label">{parameter.toUpperCase()}</span>
            <div>{dots}</div>
        </div>);
    }

    return <div className="parameters-list__container">{parameters}</div>
}