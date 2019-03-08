import React, { PureComponent } from 'react';
import Parameter from './Parameter';

export default class ParametersPanel extends PureComponent {

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
        return <div>
            {parametersPanel && <div>
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
            </div>}
            <div onClick={parametersOnClick}>
                <span>{(parametersPanel && 'Press to hide parameters') || (!parametersPanel && 'Press to show parameters')}</span>
            </div>
        </div>
    }
}