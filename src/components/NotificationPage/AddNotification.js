import React from 'react';
import { Mutation } from 'react-apollo';
import Autosuggest from 'react-autosuggest';

import { ADD_NOTIFICATION } from '../../queries/mutations';
import InputWithErrorTooltip from '../MainPage/InputWithErrorTooltip';

export default class AddNotification extends React.Component {
    state = {
        showForm: false
    }

    handleShowForm = () => {
        this.setState({
            showForm: true
        });
    }

    handleSaveNotification = () => {

    }

    render() {

        const form = (
            <Mutation mutation={ADD_NOTIFICATION} variables={{}}>
                {(addNotification) => {

                    return (
                        <div>
                            <form>
                                <InputWithErrorTooltip
                                    error={false}
                                    errorText="Enter origin"
                                >
                                    <Autosuggest />
                                </InputWithErrorTooltip>

                            </form>
                        </div>
                    );

                }}
            </Mutation>
        );

        return (
            <div>
                <button onClick={this.handleShowForm}>Add notification</button>
            </div>
        );
    }
}