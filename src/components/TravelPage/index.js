import React from 'react';
import { Query } from 'react-apollo';
import { TRAVELS_SEARCH_FULL } from '../../queries/queries';
import Header from '../Header';
import ImageSlider from './ImageSlider';
import ParametersList from './ParametersList';
import WeatherCard from './WeatherCard';

import { client } from '../../clientGraphQL/client';


// Stub for random picking weather condition
const conditions = ['cloud', 'sun', 'sun-cloud', 'rain'];

export default ({ match }) => {
    const { _id } = match.params;

    return <Query
        query={TRAVELS_SEARCH_FULL}
        variables={{ _id }}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading</p>;

            console.log(data)
            console.log(error)

            // Stub for random picking weather condition
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            console.log(condition)

            const { travelFull } = data;
            const { destination } = travelFull;
            

            return <div>
                <Header title={`${destination.nameEn}, ${destination.countryEn}`} />
                <ImageSlider
                    interval={5000}
                    name={destination.nameEn}
                    country={destination.countryEn}
                />
                <div><ParametersList destination={destination} /></div>

                <WeatherCard tempMin={travelFull.weatherTempStatMin} tempMax={travelFull.weatherTempStatMax} condition={condition} date={travelFull.date} />
                

            </div>
        }}
    </Query>
};