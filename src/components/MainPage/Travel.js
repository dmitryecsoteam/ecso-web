import React from 'react';

export default (props) => {

    const {
        _id,
        name,
        country,
        ratingList,
        priceAirplane
    } = props;

    return <div>
        <h2>{`${name}, ${country}`}</h2>
        <span>{`Price on airplane starts from ${priceAirplane}$`}</span>
    </div>

};