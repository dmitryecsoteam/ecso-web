import React, { PureComponent } from 'react';
import Parameter from './Parameter';

export default class ParametersPanel extends PureComponent {

    render() {
        return <div>
            {this.props.parametersPanel && <div>
                {/*   <span>Please enter minimum <b>three</b> and maximum <b>five</b> parameters</span> */}
                {Object.keys(this.props.parametersValue).map((parameter, id) => (
                    <Parameter
                        key={id}
                        parameter={parameter}
                        value={this.props.parametersValue[parameter]}
                        onChange={this.props.onChange}
                        disabled={(this.props.parametersEntered >= this.props.parametersMax) && (!this.props.parametersValue[parameter])}
                    />
                ))}
            </div>}
            <div onClick={this.props.parametersOnClick}>
                <span>{(this.props.parametersPanel && 'Press to hide parameters') || (!this.props.parametersPanel && 'Press to show parameters')}</span>
            </div>
        </div>
    }
}