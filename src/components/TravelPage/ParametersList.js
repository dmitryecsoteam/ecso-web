import React from 'react';
import { defaultState } from '../../store/ReduxStore';
import classNames from 'classnames';
import TrackVisibility from 'react-on-screen';


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

        const ParameterHeader = ({ isVisible }) => {
            const className = classNames('parameters-list__item-header', { 'parameters-list__item-header--animation': isVisible });
            return <div className={className} >
                <span className="parameters-list__label">{parameter}</span>
                <div className="parameters-list__dots-container">{dots}</div>
            </div>
        };

        parameters.push(<div key={parameter} className="parameters-list__item" >

            <TrackVisibility once>
                <ParameterHeader />
            </TrackVisibility>

            <div className="parameters-list__description">{destination[parameter.toLowerCase() + 'Description']}</div>
        </div>);
    }

    return <div className="parameters-list__container">{parameters}</div>
}