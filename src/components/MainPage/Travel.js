import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {

    const {
        _id,
        name,
        country,
        priceAirplane
    } = props;

    return <div>
        <Link to={`/travel/${_id}`}>
            <h2>
                {`${name}, ${country}`}
            </h2>
        </Link>
        <span>{`Price on airplane starts from ${priceAirplane}$`}</span>
    </div>

};