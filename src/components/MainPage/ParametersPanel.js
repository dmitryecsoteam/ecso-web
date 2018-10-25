import React from 'react';
import Parameter from './Parameter';

export default (props) => {

    return <div>
        {props.parametersPanel && <div>
            <span>Please enter minimum <b>three</b> and maximum <b>five</b> parameters</span>
            {props.parametersArray.map((parameter) => (
                <Parameter
                    key={parameter.id}
                    id={parameter.id}
                    parameter={parameter.name}
                    value={props.parametersValue[parameter.id]}
                    onChange={props.onChange}
                    disabled={(props.parametersEntered >= props.parametersMax) && (!props.parametersValue[parameter.id])}
                />
            ))}
        </div>}
        <div onClick={props.parametersOnClick}>
            <span>{(props.parametersPanel && 'Press to hide parameters') || (!props.parametersPanel && 'Press to show parameters')}</span>
        </div>
    </div>
};