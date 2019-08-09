import React from 'react';

import { withSession } from '../../auth/session';
import { client } from '../../clientGraphQL/client';
import history from '../../router/history';

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
            let data;
            try {
                data = await client.query({
                    query: GET_NOTIFICATIONS,
                    fetchPolicy: "network-only"
                });
            } catch (e) {
                // If error "jwt expired" or "Unauthorized" is caught - refetch current user
                if (e.message.includes('jwt expired') || e.message.includes('Unauthorized')) {
                    this.props.fetchUser();
                    return;
                }
            }


            // Set isNotification to TRUE if travelId is in user notifications array
            this.setState({
                isNotification: data.data.getNotifications.some(notification => notification.travelId === this.props.travelId)
            });
        }
    }

    handleAddNotification = async () => {
        // Protect from double-click
        if (!this.state.loadingNotification) {

            this.setState({
                loadingNotification: true
            });

            try {
                await client.mutate({
                    mutation: ADD_NOTIFICATION,
                    variables: { id: this.props.travelId }
                });
            } catch (e) {
                // If error "Such notification already exists" is caught - just do nothing
                // If error "jwt expired" or "Unauthorized" is caught - redirect to UnauthPage
                if (e.message.includes('jwt expired') || e.message.includes('Unauthorized')) {
                    this.props.fetchUser().then(() => history.push('/unauth'));
                    return;
                }

            }


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

            try {
                await client.mutate({
                    mutation: DELETE_NOTIFICATION,
                    variables: { id: this.props.travelId }
                });
            } catch (e) {
                // If error "doesn't have notification with id" is caught - just do nothing
                // If error "jwt expired" or "Unauthorized" is caught - redirect to UnauthPage
                if (e.message.includes('jwt expired') || e.message.includes('Unauthorized')) {
                    this.props.fetchUser().then(() => history.push('/unauth'));
                    return;
                }
            }


            this.setState({
                isNotification: false,
                loadingNotification: false
            });

        }
    }

    render() {
        const { user, travelId } = this.props;

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