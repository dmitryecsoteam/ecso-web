import React from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = (suggestion) => (suggestion.name_en);

const renderSuggestion = (suggestion) => (
    <span>
        {suggestion.name_en}, {suggestion.country_en}
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