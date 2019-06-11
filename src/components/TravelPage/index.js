import React from 'react';
import { Query } from 'react-apollo';
import { TRAVELS_SEARCH_FULL } from '../../queries/queries';
import Header from '../Header';
import ImageSlider from './ImageSlider';

import { client } from '../../clientGraphQL/client';

export default ({ match }) => {
    const { _id } = match.params;

    return <Query
        query={TRAVELS_SEARCH_FULL}
        variables={{ _id }}
    >
    {({ loading, error, data }) => {
        if (loading) return <p>Loading</p>;

        console.log(data)
        console.log(error)

        const { travelFull } = data;
        const { destination } = travelFull;

        return <div>
        <Header title={`${destination.nameEn}, ${destination.countryEn}`}/>
        <ImageSlider 
            interval={5000}
            name={destination.nameEn}
            country={destination.countryEn}
        />
            <h1>{`${destination.nameEn}, ${destination.countryEn}`}</h1>
        </div>
    }}
    </Query>
};