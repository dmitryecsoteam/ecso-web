import React from 'react';
import WeatherCard from './WeatherCard';

export default ({ cityDescription, population, foundingDate, weatherTempMin, weatherTempMax, conditionText, conditionImage, date }) => {
    return (
        <div className="text-area__leadtext-container">
            <p className="text-area__leadtext-item">{cityDescription}</p>
            <p className="text-area__leadtext-population">Average population: {population}</p>
            <p className="text-area__leadtext-date">Founding date: {foundingDate ? foundingDate : 'N/A'}</p>
            <WeatherCard
                tempMin={weatherTempMin}
                tempMax={weatherTempMax}
                conditionText={conditionText}
                conditionImage={conditionImage}
                date={date}
            />
        </div>
    );
}