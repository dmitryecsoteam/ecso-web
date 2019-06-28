import React from 'react';
import moment from 'moment';

export default ({ tempMin, tempMax, conditionText, conditionImage, date }) => {
    moment.locale('en');
    return (
        <div className="weather-card__container">
            <div className="weather-card__icon">
                <img src={conditionImage}/>    
            </div>
            <div className="weather-card__text-container">
                <span className="weather-card__title">Average weather on <b>{moment(date).format('DD MMMM YYYY')}</b></span>
                <div>
                    <div className="weather-card__temperature">{tempMin}°...{tempMax}°</div>
                    <div className="weather-card__condition">{conditionText}</div>
                </div>
            </div>


        </div>
    )
}