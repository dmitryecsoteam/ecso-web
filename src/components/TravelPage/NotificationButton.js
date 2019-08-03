import React from 'react';
import { ClipLoader } from 'halogenium';

import { withSession } from '../../auth/session';
import { client } from '../../clientGraphQL/client';

import { GET_NOTIFICATIONS } from '../../queries/queries';
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from '../../queries/mutations';
import NotificationIcon from '../../images/icons/notification.png';
import DeleteNotificationIcon from '../../images/icons/delete-notification.png';




export class NotificationButton extends React.Component {

    state = {
        // If current travel is in user's notification list
        isNotification: false,
        loadingNotification: false
    }

    componentDidMount() {
        this.updateNotification();
    }

    componentDidUpdate = async (prevProps) => {
        // If user changed and it's not null - refetch notifications
        if (this.props.user && prevProps.user !== this.props.user) {
            this.updateNotification();
        }
    }

    updateNotification = async () => {
        // if user is not null get list of notifications
        if (this.props.user) {
            const { data } = await client.query({
                query: GET_NOTIFICATIONS
            });

            // Set isNotification to TRUE if travelId is in user notifications array
            this.setState({
                isNotification: data.getNotifications.some(notification => notification.travelId === this.props.travelId)
            });
        }
    }

    handleAddNotification = async () => {
        // Protect from double-click
        if (!this.state.loadingNotification) {

            this.setState({
                loadingNotification: true
            });

            await client.mutate({
                mutation: ADD_NOTIFICATION,
                variables: { id: this.props.travelId }
            });

            this.setState({
                isNotification: true,
                loadingNotification: false
            });

        }
    }

    handleDeleteNotification = async () => {
        // Protect from double-click
        if (!this.state.loadingNotification) {

            this.setState({
                loadingNotification: true
            });

            await client.mutate({
                mutation: DELETE_NOTIFICATION,
                variables: { id: this.props.travelId }
            });

            this.setState({
                isNotification: false,
                loadingNotification: false
            });

        }
    }

    render() {
        const { user, travelId } = this.props;

        const spinnerNotification = (
            <div className="add-notification__spinner-container">
                <ClipLoader className="add-notification__spinner" color="#fff" size="26px" />
            </div>
        );

        const addNotificationButton = (
            <button
                className="add-notification__button add-notification__button--big"
                disabled={this.state.loadingNotification}
                onClick={this.handleAddNotification}
            >
                <img className="travel__notification-icon" src={NotificationIcon} />
                Notify me about price changes
            </button>
        );

        const deleteNotificationButton = (
            <button
                className="add-notification__button add-notification__button--big"
                disabled={this.state.loadingNotification}
                onClick={this.handleDeleteNotification}
            >
                <img className="travel__notification-icon" src={DeleteNotificationIcon} />
                Delete notification
            </button>
        );

        // render button only if user is signed in
        return (
            <React.Fragment>
                {user &&
                    <div className="travel__notification-button">
                        {this.state.isNotification ? deleteNotificationButton : addNotificationButton}
                    </div>}
            </React.Fragment>

        )
    }
}

export default withSession(NotificationButton);