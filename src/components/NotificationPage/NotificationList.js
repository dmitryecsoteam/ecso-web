import React from 'react';
import { Query } from 'react-apollo';
import { PulseLoader } from 'halogenium';

import { GET_NOTIFICATIONS } from '../../queries/queries';
import NotificationItem from './NotificationItem';
import AddNotification from './AddNotification';

export default (props) => {
    return (
        <Query query={GET_NOTIFICATIONS}>

            {({ data, loading, error, refetch }) => {

                const spinner = <div className="notification-list__spinner">
                    <PulseLoader color="#c1c1c1" />
                    <p className="results__text results__text--medium">Searching</p>
                </div>

                const list = <div>
                    <div className="notification-list__header">
                        <div className="notification-list__header-item">From</div>
                        <div className="notification-list__header-item">To</div>
                        <div className="notification-list__header-item">Date</div>
                        <div className="notification-list__header-item--desktop">Airplane price</div>
                        <div className="notification-list__header-item--desktop">Hotel price</div>
                    </div>
                    {data.getNotifications && data.getNotifications.map((item, i) => (
                        <NotificationItem
                            key={i}
                            id={item.travelId}
                            origin={item.origin.nameEn}
                            destination={item.destination.nameEn}
                            date={item.date}
                            priceAirplaneLast={item.priceAirplaneLast}
                            priceHotelLast={item.priceHotelLast}
                            refetchNotifications={refetch}
                        />
                    ))}
                    <AddNotification refetchNotifications={refetch} />
                </div>


                return (
                    <div className="notification-list__container">
                        {loading ? spinner : list}
                    </div>
                );
            }}

        </Query>

    );
}