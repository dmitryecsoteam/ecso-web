import React from 'react';
import Autosuggest from 'react-autosuggest';
import city from '../../images/icons/city.png';
import classNames from 'classnames';

const getSuggestionValue = (suggestion) => (suggestion.nameEn);

const renderSuggestion = (suggestion) => (
    <div className="react-autosuggest__suggestion-content">
        <div className="react-autosuggest__suggestion-icon-container">
            <img className="react-autosuggest__suggestion-icon" src={city} />
        </div>
        <span>
            {suggestion.nameEn}, {suggestion.countryEn}
        </span>
    </div>
);

export default ({ label, error, errorText, ...props }) => {
    const divClassName = classNames(
        'search-form__label-input',
        { 'search-form__label-input--error': error }
    );

    const errorClassName = classNames(
        'search-form__error',
        { 'search-form__error--open': error }
    );

    return <div className="search-form__input-container">
        <div className={divClassName}>
            <label className="search-form__label">{label}</label>
            <Autosuggest
                {...props}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
            />
        </div>
        <div className={errorClassName}>
            <span className="search-form__error-text">{errorText}</span>
        </div>
    </div>
};