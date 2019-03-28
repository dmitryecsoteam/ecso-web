import React from 'react';
import { SingleDatePicker } from 'react-dates';

export default ({
    label,
    ...dateProps
}) => {

    return <div className="search-form__label-input">
        <label className="search-form__label">{label}</label>
        <SingleDatePicker
            {...dateProps}
            numberOfMonths={1}
        />
    </div>
};