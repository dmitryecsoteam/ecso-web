import React from 'react';
import { Query } from 'react-apollo';
import { TRAVELS_SEARCH_FULL } from '../../queries/queries';
import Header from '../Header';
import ImageSlider from './ImageSlider';
import ParametersList from './ParametersList';
import WeatherCard from './WeatherCard';

import cloud from '../../images/icons/cloud.svg';
import sun from '../../images/icons/sun.svg';
import sunCloud from '../../images/icons/sun-cloud.svg';
import rain from '../../images/icons/rain.svg';

import { client } from '../../clientGraphQL/client';



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
            const conditions = [cloud, sun, sunCloud, rain];
            const conditionTexts = ['Mostly cloudy', 'Mostly sunny', 'Sun with clouds', 'Mostly rainy'];
            const condition = Math.floor(Math.random() * conditions.length);
            const conditionText = conditionTexts[condition];
            const conditionImage = conditions[condition];


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

                <WeatherCard
                    tempMin={travelFull.weatherTempStatMin}
                    tempMax={travelFull.weatherTempStatMax}
                    conditionText={conditionText}
                    conditionImage={conditionImage}
                    date={travelFull.date}
                />


            </div>
        }}
    </Query>
};