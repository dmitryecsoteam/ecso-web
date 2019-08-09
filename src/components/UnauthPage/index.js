import React from 'react';
import Header from '../Header';
import MessageCenter from '../MessageCenter';
import { Redirect } from 'react-router-dom';
import { withSession } from '../../auth/session';

export const UnauthPage = ({ user }) => {

    // If user is null render UnauthPage. If user is signed in redirect to home page
    return (!user) ? (
        <div>
            <Header />
            <MessageCenter text="You are not authorized to perform this operation. Please&nbsp;signin" />
        </div>
    ) : (
        <Redirect to="/" />
    )
};

export default withSession(UnauthPage);