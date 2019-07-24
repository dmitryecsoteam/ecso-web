import React from 'react';
import { Query } from 'react-apollo';

import { client } from '../clientGraphQL/client';
import { GET_CURRENT_USER } from '../queries/queries';

const SessionContext = React.createContext({});

const withSession = Component => props => (
    <Query query={GET_CURRENT_USER}>
        {({ data, loading, error, refetch }) => {

            console.log('data', data)
            //console.log('loading', loading)
            console.log('error', error)

            return (
                <SessionContext.Provider value={{ fetchUser: refetch }} >
                    <Component {...props} />
                </SessionContext.Provider>
            )
        }}
    </Query>
)


class SessionProvider extends React.Component {

    state = {
        user: null
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = () => {
        client.query({
            query: GET_CURRENT_USER,
            fetchPolicy: 'no-cache'
        }).then(({ data }) => {
            this.setState({
                user: data.currentUser
            })
        });
    }

    render() {

        const { user } = this.state;

        return (
            <SessionContext.Provider value={{ user, fetchUser: this.fetchUser }} >
                {this.props.children}
            </SessionContext.Provider>
        );
    }
}

const Session = SessionContext.Consumer;


export { withSession, SessionContext, SessionProvider, Session };