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

        const parametersIds = parametersIdsList(this.props.parametersValue);

        return <div>
            <span>Results</span>
            <div>
                {this.props.travels.map((travel) => {
                    const ratingList = [];
                    parametersIds.forEach((id) => {
                        ratingList.push({
                            name: parameters[id].name,
                            rating: travel.destination[parameters[id].rating],
                            description: travel.destination[parameters[id].description]
                        })
                    });

                    return <Travel
                        key={travel._id}
                        _id={travel._id}
                        name={travel.destination.name_en}
                        country={travel.destination.country_en}
                        ratingList={ratingList}
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