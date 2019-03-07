import React from 'react';
import InputRange from 'react-input-range';

export default (props) => {
    return (
        <div>
            <label>{props.parameter}</label>
            <InputRange
                maxValue={5}
                minValue={0}
                value={props.value}
                onChange={(e) => props.onChange(e, props.parameter)}
                disabled={props.disabled}
            />
        </div>
)};