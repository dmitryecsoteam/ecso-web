import React from 'react';

export default class Slider extends React.PureComponent {

    // state = {
    //         value: this.props.value
    //     }

    onChange = (event) => {
        this.props.onChange(event.target.value);
    }

    onLabelClick = (event) => {
        this.props.onChange(event.target.innerHTML);

    }




    render() {

        const {
            min,
            max,
            steps,
            value
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
                    onClick={this.onLabelClick}
                >
                    {i}
                </div>
            );


        }

        return <div className="slider-container">

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
                    onChange={this.onChange}
                />
            </div>



        </div>
    }
}