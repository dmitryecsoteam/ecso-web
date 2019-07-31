import React from 'react';

import Header from '../Header';
import background from '../../images/background/notifications.jpg';
import NotificationList from './NotificationList';

export default () => {

    return (
        <div>
            <Header title="My notifications" titleColorDark />
            <div className="notifications__background-container">
                <img className="notifications__background-image" src={background} />
            </div>
            <NotificationList />
            {
                //<div className="notifications__container">notifications</div>
            }
        </div>
    );
}