import React from 'react';
import { Mutation } from 'react-apollo';
import { ClipLoader } from 'halogenium';

import { DELETE_NOTIFICATION } from '../../queries/mutations';

export default ({ id, origin, destination, date, priceAirplaneLast, priceHotelLast, refetchNotifications }) => {


    return (

        <div className="notification-item__container">
            <div className="notification-item">{origin}</div>
            <div className="notification-item">{destination}</div>
            <div className="notification-item">{date}</div>
            <div className="notification-item">{priceAirplaneLast ? `${priceAirplaneLast} $` : '-'}</div>
            <div className="notification-item">{priceHotelLast ? `${priceHotelLast} $` : '-'}</div>


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
    );
}