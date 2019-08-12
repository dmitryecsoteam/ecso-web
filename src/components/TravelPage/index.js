import React from 'react';
import { Query } from 'react-apollo';
import { TRAVELS_SEARCH_FULL } from '../../queries/queries';
import minutesToHours from '../../utils/minutesToHours';
import { PulseLoader } from 'halogenium';

import Header from '../Header';
import ImageSlider from './ImageSlider';
import ParametersList from './ParametersList';
import WeatherCard from './WeatherCard';
import Banner from './Banner';
import TextArea from './TextArea';
import NotificationButton from './NotificationButton';

import cloud from '../../images/icons/cloud.svg';
import sun from '../../images/icons/sun.svg';
import sunCloud from '../../images/icons/sun-cloud.svg';
import rain from '../../images/icons/rain.svg';
// import airplane from '../../images/banners/airplane.jpg';
// import apartments from '../../images/banners/apartments.jpg';
// import carRoute from '../../images/banners/car-route.jpg';

const AIRPLANE_IMAGE = '/images/banners/airplane.jpg';
const APARTMENTS_IMAGE = '/images/banners/apartments.jpg';
const CARROUTE_IMAGE = '/images/banners/car-route.jpg';


const divider = <div className="travel__divider"></div>;

export default ({ match }) => {
    const { _id } = match.params;

    const spinner = <div className="travel__spinner">
        <PulseLoader color="#c1c1c1" size="32px" />
        <p className="results__text results__text--big">Loading</p>
    </div>

    return <Query
        query={TRAVELS_SEARCH_FULL}
        variables={{ _id }}
    >
        {({ loading, error, data }) => {

            if (loading) return <React.Fragment>{spinner}</React.Fragment>;

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

            const carDuration = minutesToHours(travelFull.carDuration);


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
                    />

                    {divider}

                    <WeatherCard
                        tempMin={travelFull.weatherTempStatMin}
                        tempMax={travelFull.weatherTempStatMax}
                        conditionText={conditionText}
                        conditionImage={conditionImage}
                        date={travelFull.date}
                    />

                    {divider}

                    <ParametersList destination={destination} />

                    {divider}

                    <NotificationButton travelId={_id} />

                    <Banner
                        linkTo="#"
                        backgroundImage={AIRPLANE_IMAGE}
                        textMain={`Airplane from ${origin.nameEn}`}
                        textSecondary={airplaneTextSecondary}
                        textButton={airplaneTextButton}
                    />

                    <Banner
                        linkTo="#"
                        backgroundImage={APARTMENTS_IMAGE}
                        textMain="Apartments and hotels"
                        textSecondary={apartmentsTextSecondary}
                        textButton={apartmentsTextButton}
                    />

                    <Banner
                        linkTo="#"
                        backgroundImage={CARROUTE_IMAGE}
                        textMain="Travel by car"
                        textSecondary={`${travelFull.carDistance} km,\u00A0\u00A0\u00A0\u00A0${carDuration}`}
                        textButton="Create route"
                    />

                    {divider}
                </div>

            </div>
        }}
    </Query>
};