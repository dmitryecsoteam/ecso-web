import React from 'react';
import Autosuggest from 'react-autosuggest';
import city from '../../images/icons/city.png';

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
    return <div className="search-form__autoinput">
        <label className="search-form__autoinput-label">{label}</label>
        <Autosuggest
            {...props}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
        />
        {error && <span>{errorText}</span>}
    </div>
};