import React from 'react';
import InputRange from 'react-input-range';
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
                onChange={(e) => props.onChange(e, props.parameter)}
            />
        </div>
    )
};

/*
<Slider
max={5}
min={0}
steps={1}
value={props.value}
onChange={(e) => props.onChange(e.target.value, props.parameter)}
/>
*/

/*
<InputRange
                maxValue={5}
                minValue={0}
                value={props.value}
                onChange={(e) => props.onChange(e, props.parameter)}
                disabled={props.disabled}
            />
            */