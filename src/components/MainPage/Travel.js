import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

// <div className="travel-card__image-container">
//                         <img
//                             className="travel-card__image"
//                             src={`/images/${nameEn}-${countryEn}/small.jpg`}
//                         />
//                     </div>


export default class Travel extends PureComponent {

    render() {
        const {
            _id,
            name,
            country,
            nameEn,
            countryEn,
            priceAirplane,
            parameters
        } = this.props;

        const parametersList = [];
        for (let param in parameters) {
            parametersList.push(<span className="travel-card__text--medium travel-card__text--padding-right" key={parametersList.length}>{`${param}: ${parameters[param]}`}</span>);
        }

        return (
            <Link
                to={`/travel/${_id}`}
                className="travel-card"
            >

                <div
                    className="travel-card__image"
                    style={{ backgroundImage: `url(/images/${nameEn}-${countryEn}/banner.jpg)` }}
                >
                </div>

                <div className="travel-card__info">

                    <h2>
                        {`${name}, ${country}`}
                    </h2>

                    <div className="travel-card__parameters">
                        {parametersList}
                    </div>

                    <div className="travel-card__price">
                        <span className="travel-card__text--small">airplane</span>
                        <span className="travel-card__text--big">{`from ${priceAirplane} $`}</span>
                    </div>

                </div>


            </Link>)


    }
}