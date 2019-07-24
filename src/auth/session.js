import React from 'react';
import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from '../queries/queries';

const SessionContext = React.createContext({});

const withSession = Component => props => (
    <Query query={GET_CURRENT_USER}>
        {({ data, loading, error, refetch }) => {

            console.log('data', data)
            //console.log('loading', loading)
            console.log('error', error)

            return (
                <SessionContext.Provider value={{ refetchUser: refetch }} >
                    <Component {...props} />
                </SessionContext.Provider>
            )
        }}
    </Query>
)

export { withSession, SessionContext };