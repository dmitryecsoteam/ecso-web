import React from 'react';
import city from '../../images/icons/city.png';

export default (suggestion) => (
    <div className="react-autosuggest__suggestion-content">
        <div className="react-autosuggest__suggestion-icon-container">
            <img className="react-autosuggest__suggestion-icon" src={city} />
        </div>
        <span>
            {suggestion.nameEn}, {suggestion.countryEn}
        </span>
    </div>
)