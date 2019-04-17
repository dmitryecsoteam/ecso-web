import React from 'react';

export default class Parameter extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.value !== this.props.value) return true;
        return false;
    }

    render() {

        // Settings
        const min = 0, max = 5, steps = 1;

        const {
            parameter,
            value,
            disabled,
            onChange
        } = this.props;

        const percents = (100 / ((max - min) / steps)) * value;

        const style = {
            background: `linear-gradient(to right, #37adbf ${percents}%, #b2b2b2 ${percents}%)`
        };

        const labels = [];
        for (let i = min; i <= max; i += steps) {

            let className = "slider__label";
            if (i <= value) {

                className += " slider__label--active";

                if (i == value) {
                    className += " slider__label--selected"
                }

            }
            if (i === min) {
                className += " slider__label--first"
            }
            if (i === max) {
                className += " slider__label--last"
            }

            labels.push(
                <div
                    key={i}
                    className={className}
                    onClick={(e) => onChange(+e.target.innerHTML, parameter)}
                >
                    {i}
                </div>
            );
        }

        return (
            <div className="parameter-container">
                <label className="parameter__label">{parameter}</label>
                <div className="slider-container">

                    <div className="slider__labels-container">
                        {labels}
                    </div>

                    <div className="slider__range-contaner">
                        <input
                            className="slider__range"
                            style={style}
                            type="range"
                            min={min}
                            max={max}
                            steps={steps}
                            value={value}
                            onChange={(e) => onChange(+e.target.value, parameter)}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        )
    }
};