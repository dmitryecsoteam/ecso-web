import React from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = (suggestion) => (suggestion.nameEn);

const renderSuggestion = (suggestion) => (
    <span>
        {suggestion.nameEn}, {suggestion.countryEn}
    </span>
);

export default ({label, error, errorText, ...props}) => {
    return <div>
        <label>{label}</label>
        <Autosuggest
            {...props}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
        />
        {error && <span>{errorText}</span>}
    </div>
};