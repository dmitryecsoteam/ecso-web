import React from 'react';
import { connect } from 'react-redux';

import TravelCard from './TravelCard';

class ResultsPanel extends React.Component {

    shouldComponentUpdate(newProps) {
        // update results only if isFetching changed
        if (newProps.isFetching !== this.props.isFetching) return true;
        return false;
    }

    render() {

        const {
            isInitEmptyResult,
            travels,
            parametersPanel,
            parametersValue,
            isFetching
        } = this.props;



        let travelsList = travels.map((travel) => {

            const parameters = {};
            if (parametersPanel) {
                for (let param in parametersValue) {
                    if (parametersValue[param]) {
                        parameters[param] = travel.destination[param.toLowerCase() + 'Rating'];
                    }
                }
            }

            return (
                <TravelCard
                key={travel._id}
                _id={travel._id}
                name={travel.destination.nameEn}
                country={travel.destination.countryEn}
                priceAirplane={travel.priceAirplane}
                nameEn={travel.destination.nameEn}
                countryEn={travel.destination.countryEn}
                parameters={parameters}
            />
            );
        }
            
        );

        if (!isInitEmptyResult && travels.length === 0) {
            travelsList = <h3>Nothing was found</h3>;
        }

        return (
            <div className="results__list">
                {travelsList}
            </div>
        )
    };
};

const mapStatetoProps = (state) => ({
    travels: state.travels.result,
    isFetching: state.travels.isFetching,
    isInitEmptyResult: state.travels.isInitEmptyResult,
    parametersPanel: state.searchForm.parametersPanel,
    parametersValue: state.searchForm.parametersValue
});

export default connect(mapStatetoProps)(ResultsPanel);