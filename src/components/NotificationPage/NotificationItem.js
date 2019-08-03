import React from 'react';
import { Mutation } from 'react-apollo';
import { ClipLoader } from 'halogenium';
import className from 'classnames';

import { DELETE_NOTIFICATION } from '../../queries/mutations';

export default ({ id, origin, destination, date, priceAirplaneLast, priceHotelLast, refetchNotifications, highlightRed }) => {

    const containerClassName = className(
        'notification-item__container',
        {
            'notification-item__container--highlight-red': highlightRed
        });

    return (
        <div className={containerClassName}>
            <div className="notification-item__first-row">
                <div className="notification-item">{origin}</div>
                <div className="notification-item">{destination}</div>
                <div className="notification-item">{date}</div>

                <div className="notification-item--desktop">{priceAirplaneLast ? `${priceAirplaneLast} $` : '-'}</div>
                <div className="notification-item--desktop">{priceHotelLast ? `${priceHotelLast} $` : '-'}</div>


                <Mutation mutation={DELETE_NOTIFICATION} variables={{ id }}>

                    {(deleteNotification, { loading }) => {

                        // NOT OPTIMISTIC UI!
                        const handleDelete = async () => {
                            // First, wait for deletion to complete
                            await deleteNotification();

                            // Second, refetch notifications list
                            refetchNotifications();
                        }

                        return (
                            <div>
                                {loading ? (
                                    <ClipLoader className="notification-item__delete-spinner" color="#c1c1c1" size="18px" />
                                ) : (
                                        <button className="notification-item__delete-button" onClick={handleDelete} title="Delete" >&#10007;</button>
                                    )}
                            </div>
                        );
                    }}
                </Mutation>
            </div>

            <div className="notification-item__second-row">
                <div className="notification-item--mobile">Airplane: {priceAirplaneLast ? `${priceAirplaneLast} $` : '-'}</div>
                <div className="notification-item--mobile">Hotel: {priceHotelLast ? `${priceHotelLast} $` : '-'}</div>
            </div>

        </div>
    );
}