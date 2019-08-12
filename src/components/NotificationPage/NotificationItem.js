import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { ClipLoader } from 'halogenium';
import className from 'classnames';
import { Link } from 'react-router-dom';

import { DELETE_NOTIFICATION } from '../../queries/mutations';

export default ({ id, origin, destination, date, priceAirplaneLast, priceHotelLast, refetchNotifications, fetchUser, highlightRed }) => {

    const [isDeleting, setIsdeleting] = useState(false);

    const containerClassName = className(
        'notification-item__container',
        {
            'notification-item__container--highlight-red': highlightRed
        });

    return (
        <div className={containerClassName}>
            <div className="notification-item__first-row">
                <div className="notification-item"><Link to={`/travel/${id}`} className="notification-item--link">{origin}</Link></div>
                <div className="notification-item"><Link to={`/travel/${id}`} className="notification-item--link">{destination}</Link></div>
                <div className="notification-item"><Link to={`/travel/${id}`} className="notification-item--link">{date}</Link></div>

                <div className="notification-item--desktop"><Link to={`/travel/${id}`} className="notification-item--link">{priceAirplaneLast ? `${priceAirplaneLast} $` : '-'}</Link></div>
                <div className="notification-item--desktop"><Link to={`/travel/${id}`} className="notification-item--link">{priceHotelLast ? `${priceHotelLast} $` : '-'}</Link></div>


                <Mutation mutation={DELETE_NOTIFICATION} variables={{ id }}>

                    {(deleteNotification) => {

                        // NOT OPTIMISTIC UI!
                        const handleDelete = async () => {

                            try {
                                setIsdeleting(true);

                                // First, wait for deletion to complete
                                await deleteNotification();

                                // Second, refetch notifications list
                                refetchNotifications();

                                setIsdeleting(false);

                            } catch (e) {
                                // If error "doesn't have notification with id" is caught - just do nothing
                                // If error "jwt expired" or "Unauthorized" is caught - refetch current user
                                if (e.message.includes('jwt expired') || e.message.includes('Unauthorized')) {
                                    fetchUser();
                                    return;
                                }
                            }



                        }

                        return (
                            <div>
                                {isDeleting ? (
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
                <div className="notification-item--mobile"><Link to={`/travel/${id}`} className="notification-item--link">Airplane: {priceAirplaneLast ? `${priceAirplaneLast} $` : '-'}</Link></div>
                <div className="notification-item--mobile"><Link to={`/travel/${id}`} className="notification-item--link">Hotel: {priceHotelLast ? `${priceHotelLast} $` : '-'}</Link></div>
            </div>

        </div>
    );
}