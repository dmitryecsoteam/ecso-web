import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from "react-router-dom";

const handleSignout = (client, history) => {
    console.log('Loggin out')
    localStorage.setItem("token", "");
    client.resetStore();
    history.push('/');
}

export const Signout = ({ history }) => (
    <ApolloConsumer>
        {client => {
            return <div 
                    onClick={() => handleSignout(client, history)}
                    className="user-menu__link"
                >
                    Log out
                </div>
        }}
    </ApolloConsumer>
);

export default withRouter(Signout);
