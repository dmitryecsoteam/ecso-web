import React from 'react';
import Parameter from './Parameter';

export default (props) => {

    return <div>
        {props.parametersPanel && <div>
        {/*   <span>Please enter minimum <b>three</b> and maximum <b>five</b> parameters</span> */}
            {Object.keys(props.parametersValue).map((parameter, id) => (
                <Parameter
                    key={id}
                    parameter={parameter}
                    value={props.parametersValue[parameter]}
                    onChange={props.onChange}
                    disabled={(props.parametersEntered >= props.parametersMax) && (!props.parametersValue[parameter])}
                />
            ))}
        </div>}
        <div onClick={props.parametersOnClick}>
            <span>{(props.parametersPanel && 'Press to hide parameters') || (!props.parametersPanel && 'Press to show parameters')}</span>
        </div>
    </div>
};