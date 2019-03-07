import React from 'react';
import { connect } from 'react-redux';

import Travel from './Travel';
import parameters from '../../parameters/parameters';

const parametersIdsList = (parametersValue) => {
    let result = [];
    parametersValue.forEach((value, index) => {
        if (value) {
            result.push(index);
        };
    });

    return result;
};

class ResultsPanel extends React.Component {
    state = {

    };

    render() {

        let travelsList = this.props.travels.map((travel) => (
            <Travel
                key={travel._id}
                _id={travel._id}
                name={travel.destination.nameEn}
                country={travel.destination.countryEn}
                priceAirplane={travel.priceAirplane}

            />)
        );

        if (!this.props.isInitEmptyResult && this.props.travels.length === 0) {
            travelsList = <h3>Nothing was found</h3>;
        }

        return <div>
            <span>Results</span>
            <div>
                {travelsList}
            </div>
        </div>
    };
};

const mapStatetoProps = (state) => ({
    travels: state.travels.result,
    parametersValue: state.searchForm.parametersValue,
    isInitEmptyResult: state.travels.isInitEmptyResult
});

export default connect(mapStatetoProps)(ResultsPanel);