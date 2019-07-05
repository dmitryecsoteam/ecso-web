import React from 'react';
import moment from 'moment';

export default ({ tempMin, tempMax, conditionText, conditionImage, date }) => {
    moment.locale('en');
    return (
        <div className="weather-card__container">
            <div className="weather-card__icon">
                <img src={conditionImage} />
            </div>
            <p className="weather-card__title">Average weather on <nobr><b>{moment(date).format('DD MMMM YYYY')}</b></nobr></p>
            <p className="weather-card__temperature">{tempMin}°...{tempMax}°</p>
            <p className="weather-card__condition">{conditionText}</p>
        </div>
    )
}