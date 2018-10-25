import React from 'react';
import { SingleDatePicker } from 'react-dates';

export default ({
    label,
    ...dateProps
}) => {

    return <div>
        <label>{label}</label>
        <SingleDatePicker
            {...dateProps}
        />
    </div>
};