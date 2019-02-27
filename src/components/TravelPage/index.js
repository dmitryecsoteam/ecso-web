import React from 'react';
import { Query } from 'react-apollo';
import { TRAVELS_SEARCH_FULL } from '../../queries/queries';

import { client } from '../../clientGraphQL/client';

export default ({ match }) => {
    const { _id } = match.params;

    return <Query
        query={TRAVELS_SEARCH_FULL}
        variables={{ _id }}
    >
    {({ loading, error, data }) => {
        if (loading) return <p>Loading</p>;

        console.log(data);

        const { travelFull } = data;
        const { destination } = travelFull;

        return <div>
            <h1>{`${destination.name_en}, ${destination.country_en}`}</h1>
        </div>
    }}
    </Query>
};