import React from 'react';
import moment from 'moment';

import cloud from '../../images/icons/cloud.svg';
import sun from '../../images/icons/sun.svg';
import sunCloud from '../../images/icons/sun-cloud.svg';
import rain from '../../images/icons/rain.svg';


export default ({ tempMin, tempMax, condition, date }) => {
    moment.locale('en');

    let url, conditionText;
    switch (condition) {
        case 'cloud': {
            url = cloud;
            conditionText = 'Mostly cloudy';
            break;
        }
        case 'sun': {
            url = sun;
            conditionText = 'Mostly sunny';
            break;
        }
        case 'sun-cloud': {
            url = sunCloud;
            conditionText = 'Sun with clouds';
            break;
        }
        case 'rain': {
            url = rain;
            conditionText = 'Mostly rainy';
            break;
        }
    }

    return (
        <div className="weather-card__container">
            <div className="weather-card__icon">
                <img src={url}/>    
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