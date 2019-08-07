import React from 'react';
import { Query } from 'react-apollo';
import { PulseLoader } from 'halogenium';

import TravelCard from './TravelCard';
import { GET_BEST_DEALS } from '../../queries/queries';

export default () => {

    return (
        <div className="best-deals__container">
            <h2 className="best-deals__text--big">Best Deals</h2>

            <Query query={GET_BEST_DEALS} variables={{ limit: 3, months: 3 }}>
                {({ data, loading, error }) => {

                    const spinner = <div className="results__spinner">
                        <PulseLoader color="#c1c1c1" />
                        <p className="results__text results__text--medium">Loading</p>
                    </div>

                    let travelsList = [];
                    if (data && data.getBestDeals) {
                        travelsList = data.getBestDeals.map((travel, i) => {
                            return <TravelCard
                                key={i}
                                _id={travel._id}
                                name={travel.destination.nameEn}
                                country={travel.destination.countryEn}
                                nameEn={travel.destination.nameEn}
                                countryEn={travel.destination.countryEn}
                                priceAirplane={travel.priceAirplane}
                                originName={travel.origin.nameEn}
                                date={travel.date}
                            />
                        })
                    }

                    return (
                        <div className="results__list">{loading ? spinner : travelsList}</div>
                    );

                }}

            </Query>


        </div>
    );

}