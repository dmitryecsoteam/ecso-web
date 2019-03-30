import React from 'react';
import { SingleDatePicker } from 'react-dates';
import isInclusivelyAfterDay from 'react-dates/src/utils/isInclusivelyAfterDay';
import isBeforeDay from 'react-dates/src/utils/isBeforeDay';
import moment from 'moment';


export default ({
    label,
    ...dateProps
}) => {

    const today = moment();
    const nextYear = moment().add(1, 'years');

    const isOutsideRange  = day => !(isInclusivelyAfterDay(day, today) && isBeforeDay(day, nextYear));

    return <div className="search-form__label-input">
        <label className="search-form__label">{label}</label>
        <SingleDatePicker
            {...dateProps}
            displayFormat={() => "DD/MM/YYYY"}
            numberOfMonths={1}
            isOutsideRange={isOutsideRange}
        />
    </div>
};