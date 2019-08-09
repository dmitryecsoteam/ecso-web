import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../Header';
import background from '../../images/background/notifications.jpg';
import NotificationList from './NotificationList';
import { withSession } from '../../auth/session';

export const NotificationPage = ({ user, fetchUser }) => {

    return user !== null ? (
        <div>
            <Header title="My notifications" titleColorDark />
            <div className="notifications__background-container">
                <img className="notifications__background-image" src={background} />
            </div>
            <NotificationList fetchUser={fetchUser} />
            {
                //<div className="notifications__container">notifications</div>
            }
        </div>
    ) : (
        <Redirect to="/unauth" />
    )
}

export default withSession(NotificationPage);