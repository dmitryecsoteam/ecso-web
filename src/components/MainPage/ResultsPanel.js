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

        return <div>
            <span>Results</span>
            <div>
                {this.props.travels.map((travel) => {
                    
                    return <Travel
                        key={travel._id}
                        _id={travel._id}
                        name={travel.destination.nameEn}
                        country={travel.destination.countryEn}
                        priceAirplane={travel.priceAirplane}

                    />
                })
                }
            </div>
        </div>
    };
};

const mapStatetoProps = (state) => ({
    travels: state.travels.result,
    parametersValue: state.searchForm.parametersValue
});

export default connect(mapStatetoProps)(ResultsPanel);