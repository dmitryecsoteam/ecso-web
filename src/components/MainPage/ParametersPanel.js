import React, { PureComponent } from 'react';
import Parameter from './Parameter';
import classNames from 'classnames';

export default class ParametersPanel extends PureComponent {

    constructor(props) {
        super(props);
        this.firstArrow = React.createRef();
        this.secondArrow = React.createRef();
    }

    componentDidMount() {
        this.firstArrow.current.classList.add('parameters-panel__arrow--first-init');
        this.secondArrow.current.classList.add('parameters-panel__arrow--second-init');
    }

    render() {

        const {
            parametersPanel,
            errorParameters,
            parametersEntered,
            parametersMax,
            parametersValue,
            onChange,
            parametersOnClick
        } = this.props;

        const paramsClassNames = classNames(
            'parameters-panel__parameters',
            { 'parameters-panel__parameters--open': parametersPanel }
        );
        const firstArrowClassNames = classNames(
            'parameters-panel__arrow',
            'parameters-panel__arrow--first',
            { 'parameters-panel__arrow--rotate': parametersPanel }
        );
        const secondArrowClassNames = classNames(
            'parameters-panel__arrow',
            'parameters-panel__arrow--second',
            { 'parameters-panel__arrow--rotate': parametersPanel }
        );

        return <div className="parameters-panel__container">

            <div className={paramsClassNames}>
                <div>{errorParameters && <span>Please enter at least one parameter</span>}</div>

                    {Object.keys(parametersValue).map((parameter, id) => (
                    <Parameter
                        key={id}
                        parameter={parameter}
                        value={parametersValue[parameter]}
                        onChange={onChange}
                        disabled={(parametersEntered >= parametersMax) && (!parametersValue[parameter])}
                    />
                    ))}
            </div>

            <div onClick={parametersOnClick} className="parameters-panel__open-close-btn">
                <span className="parameters-panel__open-close-text">{(parametersPanel && 'Hide parameters') || (!parametersPanel && 'Show parameters')}</span>
               <div className="parameters-panel__arrow-container">

                    <svg ref={this.firstArrow} className={firstArrowClassNames} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path className="parameters-panel__arrow-path" d="M253.4,73.4l-12.8-11.8c-1.7-1.6-3.7-2.4-5.9-2.4c-2.2,0-4.2,0.8-5.9,2.4L128,154.5L27.2,61.6c-1.7-1.6-3.7-2.4-5.9-2.4
                        c-2.2,0-4.2,0.8-5.9,2.4L2.6,73.4C0.9,75,0,76.8,0,78.9c0,2,0.9,3.9,2.6,5.4l119.5,110.1c1.7,1.6,3.7,2.4,5.9,2.4
                        c2.2,0,4.2-0.8,5.9-2.4L253.4,84.3c1.7-1.6,2.6-3.4,2.6-5.4C256,76.8,255.2,75,253.4,73.4z"/>
                        
                    </svg>
                    <svg ref={this.secondArrow} className={secondArrowClassNames} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path className="parameters-panel__arrow-path" d="M253.4,73.4l-12.8-11.8c-1.7-1.6-3.7-2.4-5.9-2.4c-2.2,0-4.2,0.8-5.9,2.4L128,154.5L27.2,61.6c-1.7-1.6-3.7-2.4-5.9-2.4
                        c-2.2,0-4.2,0.8-5.9,2.4L2.6,73.4C0.9,75,0,76.8,0,78.9c0,2,0.9,3.9,2.6,5.4l119.5,110.1c1.7,1.6,3.7,2.4,5.9,2.4
                        c2.2,0,4.2-0.8,5.9-2.4L253.4,84.3c1.7-1.6,2.6-3.4,2.6-5.4C256,76.8,255.2,75,253.4,73.4z"/>
                    </svg>
                </div>
            </div>
                
        </div>
    }
}