import React from 'react';
import { Query } from 'react-apollo';
import { TRAVELS_SEARCH_FULL } from '../../queries/queries';
import Header from '../Header';
import ImageSlider from './ImageSlider';
import ParametersList from './ParametersList';
import WeatherCard from './WeatherCard';
import Banner from './Banner';
import TextArea from './TextArea';

import cloud from '../../images/icons/cloud.svg';
import sun from '../../images/icons/sun.svg';
import sunCloud from '../../images/icons/sun-cloud.svg';
import rain from '../../images/icons/rain.svg';
import airplane from '../../images/banners/airplane.jpg';
import apartments from '../../images/banners/apartments.jpg';

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
            const { destination, origin } = travelFull;


            const airplaneTextSecondary = travelFull.priceAirplane ? `Prices from ${travelFull.priceAirplane} $` : '';
            const airplaneTextButton = travelFull.priceAirplane ? 'Buy tickets' : 'Get prices';

            const apartmentsTextSecondary = travelFull.priceHotel ? `Prices from ${travelFull.priceHotel} $` : '';
            const apartmentsTextButton = travelFull.priceHotel ? 'Book apartments' : 'Get prices';


            return <div>
                <Header title={`${destination.nameEn}, ${destination.countryEn}`} />

                <ImageSlider
                    interval={5000}
                    name={destination.nameEn}
                    country={destination.countryEn}
                />

                <div className="travel__container">

                    <TextArea
                        cityDescription={destination.cityDescription}
                        population={destination.population}
                        foundingDate={destination.foundingDate}
                        weatherTempMin={travelFull.weatherTempStatMin}
                        weatherTempMax={travelFull.weatherTempStatMax}
                        conditionText={conditionText}
                        conditionImage={conditionImage}
                        date={travelFull.date}
                    />

                    <ParametersList destination={destination} />

                    <Banner
                        linkTo="#"
                        backgroundImage={airplane}
                        textMain={`Airplane from ${origin.nameEn}`}
                        textSecondary={airplaneTextSecondary}
                        textButton={airplaneTextButton}
                    />

                    <Banner
                        linkTo="#"
                        backgroundImage={apartments}
                        textMain="Apartments and hotels"
                        textSecondary={apartmentsTextSecondary}
                        textButton={apartmentsTextButton}
                    />
                </div>

            </div>
        }}
    </Query>
};