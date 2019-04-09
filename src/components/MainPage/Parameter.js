import React from 'react';
import Slider from './Slider';

export default (props) => {
    return (
        <div className="parameter-container">
            <label className="parameter__label">{props.parameter}</label>
            <Slider
                max={5}
                min={0}
                steps={1}
                value={props.value}
                disabled={props.disabled}
                onChange={(value) => props.onChange(value, props.parameter)}
            />
        </div>
    )
};