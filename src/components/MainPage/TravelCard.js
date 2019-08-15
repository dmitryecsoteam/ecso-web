import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class TravelCard extends PureComponent {

    render() {
        const {
            _id,
            name,
            country,
            nameEn,
            countryEn,
            priceAirplane,
            carDistance,
            parameters,
            originName,
            date
        } = this.props;

        const parametersList = [];
        for (let param in parameters) {
            parametersList.push(<span className="travel-card__text--medium travel-card__text--padding-right" key={parametersList.length}>{`${param}: ${parameters[param]}`}</span>);
        }

        let priceInfo;
        if (!priceAirplane && carDistance <= 200) {
            priceInfo = (<div className="travel-card__price">
                <span className="travel-card__text--small">by car</span>
                <span className="travel-card__text--big">{`approx. ${carDistance} km`}</span>
            </div>);
        } else {
            priceInfo = (<div className="travel-card__price">
                <span className="travel-card__text--small">airplane</span>
                <span className="travel-card__text--big">{priceAirplane ? `from ${priceAirplane} $` : `find prices`}</span>
            </div>);
        }

        const originAndDate = (
            <p className="travel-card__text--big">From {originName} &emsp; {date}</p>
        );

        return (
            <Link
                to={`/travel/${_id}`}
                className="travel-card"
            >

                <div
                    className="travel-card__image"
                    style={{ backgroundImage: `url(/images/${nameEn.replace(/ /g, '_')}-${countryEn}/banner.jpg)` }}
                >
                </div>

                <div className="travel-card__info">

                    <h2>
                        {`${name}, ${country}`}
                    </h2>

                    <div className="travel-card__parameters">
                        {originName ? originAndDate : parametersList}
                    </div>

                    {priceInfo}

                </div>
            </Link>)
    }
}

TravelCard.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    country: PropTypes.string,
    nameEn: PropTypes.string,
    countryEn: PropTypes.string,
    priceAirplane: PropTypes.number,
    carDistance: PropTypes.number,
    parameters: PropTypes.object
}