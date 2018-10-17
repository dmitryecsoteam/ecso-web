import React from 'react';

export default class Test extends React.Component {

    onButtonClick = () => {
        console.log('Button clicked!');
    };

    render() {
        return <button onClick={this.onButtonClick}>My test button</button>
    };
}