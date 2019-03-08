import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';


export default class Travel extends PureComponent {

    render() {
        const {
            _id,
            name,
            country,
            priceAirplane
        } = this.props;

        return <div>
            <Link to={`/travel/${_id}`}>
                <h2>
                    {`${name}, ${country}`}
                </h2>
            </Link>
            <span>{`Price on airplane starts from ${priceAirplane}$`}</span>
        </div>
    }
}