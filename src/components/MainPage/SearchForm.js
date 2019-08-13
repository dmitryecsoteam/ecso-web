import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import MediaQuery from 'react-responsive';


import { startSearchOrigins } from '../../actions/originInputActions';
import { startSearchDestinations } from '../../actions/destinationInputActions';
import { startSearchTravelsByParameters, startSearchTravelsByDestination, setTravels } from '../../actions/travelsActions';
import { setSearchForm } from '../../actions/searchFormActions';
import suggestionsListSelector from '../../selectors/suggestionsListSelector';

import ParametersPanel from './ParametersPanel';
import InputWithErrorTooltip from './InputWithErrorTooltip';
import Autosuggest from 'react-autosuggest';
import SuggestionCity from './SuggestionCity';
import { SingleDatePicker } from 'react-dates';
import { isBeforeDay, isInclusivelyAfterDay } from '../../utils/dates';
import { numberOfNonZeroParams } from '../../utils/parameters';

// Minimum and maximum number of parameters user must select
const PARAMETERS_MIN = 1;
const PARAMETERS_MAX = 6;




export class SearchForm extends React.Component {

    /* 
     *   originInputValue: displayed name of origin, selected by user. Defaults to ''
     *   originSelectedId: ID of selected origin in database. Defaults to 0
     *   destinationInputValue: displayed name of destination, selected by user. Defaults to ''
     *   destinationSelectedId: ID of selected destination in database. Defaults to 0
     *   suggestOrigins: array of suggested origins from DB, based on user's typed characters
     *   suggestDestinations: array of suggested destinations from DB, based on user's typed characters
     * 
     *   date: defaults to current date
     *   calendarFocused: react-dates prop
     * 
     *   errorOriginInput: indicates incorrect origin input
     *   errorDestinationInput: indicates incorrect destination input
     *   errorDateInput: indicates incorrect date input
     *   errorParameters: indicates incorrect parameters input
     * 
     *   parametersPanel: show or hide parameters panel. Defaults to false
     *   parametersValue: object of parameters with values entered by user. Defaults to {
     *       Beach: 0,
     *       Food: 0,
     *       Museum: 0,
     *       Nature: 0,
     *       Shopping: 0,
     *       Nightlife: 0
     *   }
     * 
     *  showOriginHint: show hint that test data is only Tokyo and Osaka for origin
     */
    state = {
        originInputValue: this.props.searchForm.originInputValue,
        originSelectedId: this.props.searchForm.originSelectedId,
        destinationInputValue: this.props.searchForm.destinationInputValue,
        destinationSelectedId: this.props.searchForm.destinationSelectedId,
        suggestOrigins: [],
        suggestDestinations: [],
        date: this.props.searchForm.date,
        calendarFocused: false,
        errorOriginInput: false,
        errorDestinationInput: false,
        errorDestinationInputText: '',
        errorDateInput: false,
        errorParameters: false,
        parametersPanel: this.props.searchForm.parametersPanel,
        parametersValue: this.props.searchForm.parametersValue,
        showOriginHint: false
    };

    /*
     *   If user focused out from the input and didn't choose any suggestion, then the first item of the suggestions array
     *   would be picked up and set as input value; if suggestions array is empty - empty string ('') will be set as input value.
     *   If user selected suggestion, then this suggestion would be set as input value and the input 
     *   would be focused out (Autosuggest's prop focusInputOnSuggestionClick={false}).
     *
     *   This variables (originSelectedByUser, destinationSelectedByUser) will let onBlur event know, if user selected suggestion or not.
     *   We can't make this variables part of the component's state, because setState function is ASYNC
     *   and when onBlur event is fired the state won't be actual.
     *   We need some SYNC logic:
     *   onSuggestionSelected change originSelectedByUser/destinationSelectedByUser to 'true', so the onBlur function will know, that user 
     *   selected suggestion. onInputChange will make these variables 'false' again.
     */
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
                        suggestOrigins: suggestionsListSelector(this.props.origins, state.originInputValue)
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
                        suggestDestinations: suggestionsListSelector(this.props.destinations, state.destinationInputValue)
                    }));
                });
            }
        }
    }

    onOriginInputBlur = () => {

        this.setState({
            showOriginHint: false
        });

        if (!this.originSelectedByUser) {

            if (this.state.suggestOrigins.length !== 0) {
                this.setState(() => ({
                    originInputValue: this.state.suggestOrigins[0].nameEn,
                    originSelectedId: this.state.suggestOrigins[0]._id,
                    errorOriginInput: false
                }), () => this.props.setSearchForm(this.state));
            } else {
                this.setState(() => ({
                    originInputValue: '',
                    originSelectedId: 0
                }), () => this.props.setSearchForm(this.state));
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
                }), () => this.props.setSearchForm(this.state));
            } else {
                this.setState(() => ({
                    destinationInputValue: '',
                    destinationSelectedId: 0
                }), () => this.props.setSearchForm(this.state));
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
        }), () => this.props.setSearchForm(this.state));
    };

    onDestinationSuggestionSelected = (event, { suggestion }) => {
        this.destinationSelectedByUser = true;
        this.setState(() => ({
            destinationSelectedId: suggestion._id
        }), () => this.props.setSearchForm(this.state));
    };

    onOriginSuggestionsFetchRequested = ({ value, reason }) => {
        this.setState(() => ({
            suggestOrigins: suggestionsListSelector(this.props.origins, value)
        }));
    };

    onOriginInputFocus = () => {
        this.setState(() => ({
            showOriginHint: true
        }));
    }

    onDestinationSuggestionsFetchRequested = ({ value }) => {
        this.setState(() => ({
            suggestDestinations: suggestionsListSelector(this.props.destinations, value)
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
        }), () => this.props.setSearchForm(this.state));
    };

    onCalendarFocusChange = ({ focused }) => {
        this.setState(() => ({
            calendarFocused: focused
        }));
    };

    // If day is out of range it will be set to null in state
    isOutsideRange = day => !(isInclusivelyAfterDay(day, moment()) && isBeforeDay(day, moment().add(1, 'years')));

    renderCalendarInfo = () => (<span className="Calendar__info--bottom">Date range: one year</span>);



    /*************** Functions for Parameters inputs ***************/

    parametersOnClick = () => {
        this.setState((state) => ({
            parametersPanel: !state.parametersPanel,
            errorDestinationInput: false,
            errorParameters: false
        }),
            // Callback function after setState completion. Update search form state in redux store 
            () => this.props.setSearchForm(this.state));
    };

    onParameterChange = (value, parameterName) => {
        this.setState((prevState) => {

            //prevState.parametersValue[id] = value;
            const parametersValue = {
                ...prevState.parametersValue,
            };
            parametersValue[parameterName] = value;

            return ({
                parametersValue
            });
        },
            // Callback function after setState completion. Update search form state in redux store
            () => this.props.setSearchForm(this.state));
    };



    /*************** Form Submit ***************/

    onFormSubmit = async (e) => {
        e.preventDefault();

        // Check that inputs are correct
        let errorOriginInput = false;
        let errorDestinationInput = false;
        let errorDateInput = false;
        let errorParameters = false;
        let errorDestinationInputText = '';

        if (this.state.originInputValue === '') {
            errorOriginInput = true;
        }

        if (this.state.destinationInputValue === '' && !this.state.parametersPanel) {
            errorDestinationInput = true;
            errorDestinationInputText = 'Enter destination';
        } else if (this.state.originSelectedId === this.state.destinationSelectedId && !this.state.parametersPanel) {
            errorDestinationInput = true;
            errorDestinationInputText = 'Same as origin';
        }

        if (!this.state.date) {
            errorDateInput = true;
        }

        if (this.state.parametersPanel && numberOfNonZeroParams(this.state.parametersValue) < PARAMETERS_MIN) {
            errorParameters = true;
        } else {
            errorParameters = false;
        }

        this.setState(() => ({
            errorOriginInput,
            errorDestinationInput,
            errorDateInput,
            errorParameters,
            errorDestinationInputText
        }));

        if (!(errorOriginInput || errorDestinationInput || errorDateInput || errorParameters)) {

            // Scroll to ResultsPanel
            window.scrollTo({
                top: this.props.resultsPanelRef.current.offsetTop,
                behavior: 'smooth'
            });

            // Find travels based on parameters
            if (this.state.parametersPanel) {
                this.props.startSearchTravelsByParameters(this.state.originSelectedId, this.state.parametersValue, this.state.date.format('YYYY-MM-DD'));
            } else {
                this.props.startSearchTravelsByDestination(this.state.originSelectedId, this.state.destinationSelectedId, this.state.date.format('YYYY-MM-DD'));
            };
        };
    };



    /*************** Render ***************/

    render() {
        const {
            originInputValue,
            destinationInputValue,
            suggestOrigins,
            suggestDestinations,
            errorDestinationInput,
            errorDestinationInputText,
            errorOriginInput,
            errorDateInput,
            date,
            calendarFocused,
            parametersPanel,
            errorParameters,
            parametersValue,
            showOriginHint
        } = this.state;
        const originInputProps = {
            value: originInputValue,
            onChange: this.onOriginInputChange,
            onBlur: this.onOriginInputBlur,
            placeholder: 'City, airport code',
            onFocus: this.onOriginInputFocus
        };
        const destinationInputProps = {
            value: destinationInputValue,
            onChange: this.onDestinationInputChange,
            onBlur: this.onDestinationInputBlur,
            disabled: parametersPanel,
            placeholder: 'City, airport code'
        };

        return (
            <div className="search-form">
                <form
                    className="search-form__form"
                    onSubmit={this.onFormSubmit}
                >
                    <div className="search-form__autoinput-group">
                        <InputWithErrorTooltip
                            label="From:"
                            error={errorOriginInput}
                            errorText="Enter origin"
                            hint={showOriginHint}
                            hintText="Test data: Tokyo, Osaka"
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

                        <div className="search-form__second-input-container">
                            <InputWithErrorTooltip
                                label="To:"
                                error={errorDestinationInput}
                                errorText={errorDestinationInputText}
                                disabled={parametersPanel}
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

                    </div>
                    <div className="search-form__autoinput-group">
                        <InputWithErrorTooltip
                            label="Date:"
                            error={errorDateInput}
                            errorText="Enter correct date"
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
                        <div className="search-form__second-input-container">
                            <button className="search-form__submit-btn">Find</button>
                        </div>
                    </div>

                    <div>
                        <ParametersPanel
                            parametersPanel={parametersPanel}
                            errorParameters={errorParameters}
                            parametersEntered={numberOfNonZeroParams(this.state.parametersValue)}
                            parametersMax={PARAMETERS_MAX}
                            parametersValue={parametersValue}
                            onChange={this.onParameterChange}
                            parametersOnClick={this.parametersOnClick}
                        />
                    </div>

                </form>

            </div>);
    };
};

const mapStateToProps = (state) => ({
    origins: state.originInput.origins,
    isFetchingOrigins: state.originInput.isFetching,
    destinations: state.destinationInput.destinations,
    isFetchingDestinations: state.destinationInput.isFetching,
    searchForm: state.searchForm,
    resultsPanelRef: state.resultsPanelRef.ref
});

const mapDispatchToProps = (dispatch) => ({
    startSearchOrigins: (text) => dispatch(startSearchOrigins(text)),
    startSearchDestinations: (text) => dispatch(startSearchDestinations(text)),
    startSearchTravelsByParameters: (originId, parametersValue, date) => dispatch(startSearchTravelsByParameters(originId, parametersValue, date)),
    startSearchTravelsByDestination: (originId, destinationId, date) => dispatch(startSearchTravelsByDestination(originId, destinationId, date)),
    setSearchForm: (state) => dispatch(setSearchForm(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);