import React from 'react';
import { Mutation } from 'react-apollo';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { ClipLoader } from 'halogenium';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { isBeforeDay, isInclusivelyAfterDay } from '../../utils/dates';

import { ADD_NOTIFICATION } from '../../queries/mutations';
import InputWithErrorTooltip from '../MainPage/InputWithErrorTooltip';
import SuggestionCity from '../MainPage/SuggestionCity';

import { setErrorId, clearErrorId } from '../../actions/notificationListActions';

import { startSearchOrigins } from '../../actions/originInputActions';
import { startSearchDestinations } from '../../actions/destinationInputActions';
import selectOriginSuggestions from '../../selectors/originInputSelector';
import selectDestinationSuggestions from '../../selectors/destinationInputSelector';

const defaultState = {
    saving: false,
    showForm: false,
    originInputValue: '',
    originSelectedId: 0,
    suggestOrigins: [],
    errorOriginInput: false,
    errorOriginText: '',
    destinationInputValue: '',
    destinationSelectedId: 0,
    suggestDestinations: [],
    errorDestinationInput: false,
    errorDestinationText: '',
    date: moment(),
    calendarFocused: false,
    errorDateInput: false,
    errorDateText: ''
};


export class AddNotification extends React.Component {
    state = { ...defaultState }

    componentWillUnmount() {
        // Clear errorId when navigating out of notification page
        this.props.clearErrorId();
    }

    handleShowForm = () => {
        this.setState({
            showForm: true
        });
    }

    originSelectedByUser = false;
    destinationSelectedByUser = false;



    /*************** Functions for Autosuggest inputs ***************/

    onOriginInputChange = (event, { newValue }) => {

        // Set originSelected to false
        this.originSelectedByUser = false;

        // First, update state with entered value
        this.setState(() => ({
            originInputValue: newValue,
            originSelectedId: 0
        }));

        // Second, check that user entered new City (typed or copied),
        // that starts from different letter. This means we must fetch data from API 
        // for the first letter.
        // Additionally check that newValue is not '' (user deleted data from the input).
        if ((this.state.originInputValue[0] !== newValue[0]) && (newValue)) {

            // Check that newValue doesn't start from special character
            if (!/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newValue[0])) {

                // Fetch list of cities starting with first entered in input character in lower case.
                // Data will be cached.
                // And then update state to load autosuggest information.
                this.props.startSearchOrigins(newValue[0].toLowerCase()).then(() => {
                    this.setState((state) => ({
                        suggestOrigins: selectOriginSuggestions(this.props.origins, state.originInputValue)
                    }));
                });
            }
        }
    }

    onDestinationInputChange = (event, { newValue }) => {

        // Set destinationSelected to false
        this.destinationSelectedByUser = false;

        // First, update state with entered value
        this.setState(() => ({
            destinationInputValue: newValue,
            destinationSelectedId: 0
        }));

        // Second, check that user entered new City (typed or copied),
        // that starts from different letter. This means we must fetch data from API 
        // for the first letter.
        // Additionally check that newValue is not '' (user deleted data from the input).
        if ((this.state.destinationInputValue[0] !== newValue[0]) && (newValue)) {

            // Check that newValue doesn't start from special character
            if (!/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newValue[0])) {

                // Fetch list of cities starting with first entered in input character in lower case.
                // Data will be cached.
                // And then update state to load autosuggest information.
                this.props.startSearchDestinations(newValue[0].toLowerCase()).then(() => {
                    this.setState((state) => ({
                        suggestDestinations: selectDestinationSuggestions(this.props.destinations, state.destinationInputValue)
                    }));
                });
            }
        }
    }

    onOriginInputBlur = () => {

        if (!this.originSelectedByUser) {

            if (this.state.suggestOrigins.length !== 0) {
                this.setState(() => ({
                    originInputValue: this.state.suggestOrigins[0].nameEn,
                    originSelectedId: this.state.suggestOrigins[0]._id,
                    errorOriginInput: false
                }));
            } else {
                this.setState(() => ({
                    originInputValue: '',
                    originSelectedId: 0
                }));
            };
        } else {
            this.setState(() => ({
                errorOriginInput: false
            }));
        };
    };

    onDestinationInputBlur = () => {

        if (!this.destinationSelectedByUser) {

            if (this.state.suggestDestinations.length !== 0) {
                this.setState(() => ({
                    destinationInputValue: this.state.suggestDestinations[0].nameEn,
                    destinationSelectedId: this.state.suggestDestinations[0]._id,
                    errorDestinationInput: false
                }));
            } else {
                this.setState(() => ({
                    destinationInputValue: '',
                    destinationSelectedId: 0
                }));
            };
        } else {
            this.setState(() => ({
                errorDestinationInput: false
            }));
        };
    };

    onOriginSuggestionSelected = (event, { suggestion }) => {
        this.originSelectedByUser = true;
        this.setState(() => ({
            originSelectedId: suggestion._id
        }));
    };

    onDestinationSuggestionSelected = (event, { suggestion }) => {
        this.destinationSelectedByUser = true;
        this.setState(() => ({
            destinationSelectedId: suggestion._id
        }));
    };

    onOriginSuggestionsFetchRequested = ({ value }) => {
        this.setState(() => ({
            suggestOrigins: selectOriginSuggestions(this.props.origins, value)
        }));
    };

    onDestinationSuggestionsFetchRequested = ({ value }) => {
        this.setState(() => ({
            suggestDestinations: selectDestinationSuggestions(this.props.destinations, value)
        }));
    };

    onOriginSuggestionsClearRequested = () => {
        this.setState(() => ({
            suggestOrigins: []
        }));
    };

    onDestinationSuggestionsClearRequested = () => {
        this.setState(() => ({
            suggestDestinations: []
        }));
    };

    getSuggestionValue = (suggestion) => (suggestion.nameEn);


    /*************** Functions for react-dates calendar ***************/

    onDateChange = (date) => {
        this.setState(() => ({
            date
        }));
    };

    onCalendarFocusChange = ({ focused }) => {
        this.setState(() => ({
            calendarFocused: focused
        }));
    };

    // If day is out of range it will be set to null in state
    isOutsideRange = day => !(isInclusivelyAfterDay(day, moment()) && isBeforeDay(day, moment().add(1, 'years')));

    renderCalendarInfo = () => (<span className="Calendar__info--bottom">Date range: one year</span>);





    handleSaveNotification = async (e, addNotification) => {
        e.preventDefault();

        // Protection from double-click
        if (this.state.saving) {
            return;
        }

        this.setState({
            saving: true
        });


        // Clear errorId if it was highlighted
        if (this.props.errorTravelId) {
            this.props.clearErrorId();
        }


        let errorOriginInput = false;
        let errorOriginText = '';
        let errorDestinationInput = false;
        let errorDestinationText = '';
        let errorDateInput = false;
        let errorDateText = '';

        if (this.state.originInputValue === '') {
            errorOriginInput = true;
            errorOriginText = 'Enter origin';
        };

        if (this.state.destinationInputValue === '') {
            errorDestinationInput = true;
            errorDestinationText = 'Enter destination';
        };

        if (!this.state.date) {
            errorDateInput = true;
            errorDateText = 'Enter correct date';
        }

        this.setState(() => ({
            errorOriginInput,
            errorDestinationInput,
            errorDateInput,
            errorOriginText,
            errorDestinationText,
            errorDateText
        }));

        if (!(errorOriginInput || errorDestinationInput || errorDateInput)) {

            try {

                // add new notification
                await addNotification();

                // refetch list of notifications and rerender it in NotificationList
                await this.props.refetchNotifications();

                // close and cleanup add notification form
                this.setState({
                    ...defaultState
                });

            } catch (e) {

                // If notification is already in database:


                if (e.message.includes('Such notification already exists')) {

                    // 1. refetch list of notifications
                    await this.props.refetchNotifications();

                    // 2. render error message
                    errorOriginInput = errorDestinationInput = errorDateInput = true;
                    errorOriginText = errorDateText = '';
                    errorDestinationText = 'You have this notification';
                    this.setState(() => ({
                        errorOriginInput,
                        errorDestinationInput,
                        errorDateInput,
                        errorOriginText,
                        errorDestinationText,
                        errorDateText,
                        saving: false
                    }));

                    // 3. Send travelId to redux store
                    this.props.setErrorId(e.message.match(/TravelId: (.*),/)[1]);
                }
            }




        } else {
            this.setState({
                saving: false
            });
        }
    }

    render() {

        const {
            saving,
            originInputValue,
            originSelectedId,
            destinationInputValue,
            destinationSelectedId,
            suggestOrigins,
            suggestDestinations,
            errorDestinationInput,
            errorOriginInput,
            errorDateInput,
            errorOriginText,
            errorDestinationText,
            errorDateText,
            date,
            calendarFocused
        } = this.state;

        const spinner = (
            <div className="add-notification__spinner-container">
                <ClipLoader className="add-notification__spinner" color="#fff" size="26px" />
            </div>
        );


        const form = (
            <Mutation mutation={ADD_NOTIFICATION} variables={{ date: date.format('YYYY-MM-DD'), origin: originSelectedId, destination: destinationSelectedId }}>

                {(addNotification) => {

                    const originInputProps = {
                        value: originInputValue,
                        onChange: this.onOriginInputChange,
                        onBlur: this.onOriginInputBlur,
                        placeholder: 'City, airport code'
                    };

                    const destinationInputProps = {
                        value: destinationInputValue,
                        onChange: this.onDestinationInputChange,
                        onBlur: this.onDestinationInputBlur,
                        placeholder: 'City, airport code'
                    };

                    return (
                        <div className="add-notification__form-container">
                            <form onSubmit={e => this.handleSaveNotification(e, addNotification)}>

                                <div className="add-notification__inputs">

                                    <div className="add-notification__input-item">
                                        <InputWithErrorTooltip
                                            label="From:"
                                            error={errorOriginInput}
                                            errorText={errorOriginText}
                                        >
                                            <Autosuggest
                                                suggestions={suggestOrigins}
                                                onSuggestionsFetchRequested={this.onOriginSuggestionsFetchRequested}
                                                onSuggestionsClearRequested={this.onOriginSuggestionsClearRequested}
                                                inputProps={originInputProps}
                                                focusInputOnSuggestionClick={false}
                                                onSuggestionSelected={this.onOriginSuggestionSelected}
                                                getSuggestionValue={this.getSuggestionValue}
                                                renderSuggestion={SuggestionCity}
                                            />
                                        </InputWithErrorTooltip>
                                    </div>

                                    <div className="add-notification__input-item">
                                        <InputWithErrorTooltip
                                            label="To:"
                                            error={errorDestinationInput}
                                            errorText={errorDestinationText}
                                        >
                                            <Autosuggest
                                                suggestions={suggestDestinations}
                                                onSuggestionsFetchRequested={this.onDestinationSuggestionsFetchRequested}
                                                onSuggestionsClearRequested={this.onDestinationSuggestionsClearRequested}
                                                inputProps={destinationInputProps}
                                                focusInputOnSuggestionClick={false}
                                                onSuggestionSelected={this.onDestinationSuggestionSelected}
                                                getSuggestionValue={this.getSuggestionValue}
                                                renderSuggestion={SuggestionCity}
                                            />
                                        </InputWithErrorTooltip>
                                    </div>

                                    <div className="add-notification__input-item">
                                        <InputWithErrorTooltip
                                            label="Date:"
                                            error={errorDateInput}
                                            errorText={errorDateText}
                                        >
                                            {/* 
                              *   Calendar for small devices as modal.
                              *   
                              *   window.testMediaQueryValues allows to set device width in testing environment.
                              *   In browser it will be undefined and "values" will fall back to actual device width.
                              *
                              */}
                                            <MediaQuery query="(max-width: 415px)" values={window.testMediaQueryValues}>
                                                <SingleDatePicker
                                                    date={date}
                                                    onDateChange={this.onDateChange}
                                                    focused={calendarFocused}
                                                    onFocusChange={this.onCalendarFocusChange}
                                                    id="date_calendar_id"
                                                    displayFormat={() => "DD/MM/YYYY"}
                                                    numberOfMonths={1}
                                                    isOutsideRange={this.isOutsideRange}
                                                    placeholder=""
                                                    noBorder
                                                    hideKeyboardShortcutsPanel
                                                    withPortal
                                                    firstDayOfWeek={1}
                                                    daySize={38}
                                                    calendarInfoPosition="bottom"
                                                    renderCalendarInfo={this.renderCalendarInfo}
                                                    readOnly
                                                />
                                            </MediaQuery>

                                            {/* Calendar for big devices */}
                                            <MediaQuery query="(min-width: 415px)" values={window.testMediaQueryValues}>
                                                <SingleDatePicker
                                                    date={date}
                                                    onDateChange={this.onDateChange}
                                                    focused={calendarFocused}
                                                    onFocusChange={this.onCalendarFocusChange}
                                                    id="date_calendar_id"
                                                    displayFormat={() => "DD/MM/YYYY"}
                                                    numberOfMonths={1}
                                                    isOutsideRange={this.isOutsideRange}
                                                    placeholder=""
                                                    noBorder
                                                    hideKeyboardShortcutsPanel
                                                    firstDayOfWeek={1}
                                                    daySize={34}
                                                    verticalSpacing={0}
                                                    calendarInfoPosition="bottom"
                                                    renderCalendarInfo={this.renderCalendarInfo}
                                                    readOnly
                                                />
                                            </MediaQuery>
                                        </InputWithErrorTooltip>
                                    </div>

                                </div>

                                <div className="add-notification__button-container">
                                    <button className="add-notification__button" disabled={saving}>{saving ? spinner : "SAVE"}</button>
                                </div>

                            </form>
                        </div>
                    );

                }}
            </Mutation>
        );

        return (
            <div>
                {this.state.showForm ? form : (
                    <div className="add-notification__button-container">
                        <button className="add-notification__button" onClick={this.handleShowForm}>Add notification</button>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    origins: state.originInput.origins,
    isFetchingOrigins: state.originInput.isFetching,
    destinations: state.destinationInput.destinations,
    isFetchingDestinations: state.destinationInput.isFetching,
    errorTravelId: state.notificationList.errorTravelId
});

const mapDispatchToProps = (dispatch) => ({
    startSearchOrigins: (text) => dispatch(startSearchOrigins(text)),
    startSearchDestinations: (text) => dispatch(startSearchDestinations(text)),
    setErrorId: (id) => dispatch(setErrorId(id)),
    clearErrorId: () => dispatch(clearErrorId())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNotification);