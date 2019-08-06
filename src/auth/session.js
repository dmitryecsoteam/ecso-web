import React from 'react';
import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from '../queries/queries';

//fetchPolicy="network-only"
//fetchPolicy="cache-and-network"
const withSession = Component => props => (
    <Query query={GET_CURRENT_USER} >
        {({ data, loading, error, refetch }) => {

            const user = data ? data.currentUser : null;

            return <Component {...props} user={user} fetchUser={refetch} />
            
        }}
    </Query>
)



export { withSession };