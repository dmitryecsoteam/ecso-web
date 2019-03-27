import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import { startSearchOrigins } from '../../actions/originInputActions';
import { startSearchDestinations } from '../../actions/destinationInputActions';
import { startSearchTravelsByParameters, startSearchTravelsByDestination } from '../../actions/travelsActions';
import { setSearchForm } from '../../actions/searchFormActions';
import selectOriginSuggestions from '../../selectors/originInputSelector';
import selectDestinationSuggestions from '../../selectors/destinationInputSelector';

import InputAutosuggest from './InputTextAutosuggest';
import InputDate from './InputDate';
import ParametersPanel from './ParametersPanel';

import parametersArray from '../../parameters/parameters';




// If user focused out from the input and didn't choose any suggestion, then the first item of the suggestions array
// would be picked up and set as input value; if suggestions array is empty - empty string ('') will be set as input value.
// If user selected suggestion, then this suggestion would be set as input value and the input 
// would be focused out (Autosuggest's prop focusInputOnSuggestionClick={false}).
//
// This variables (originSelectedByUser, destinationSelectedByUser) will let onBlur event know, if user selected suggestion or not.
// We can't make this variables part of the component's state, because setState function is ASYNC
// and when onBlur event is fired the state won't be actual.
// We need some SYNC logic:
// onSuggestionSelected change originSelectedByUser/destinationSelectedByUser to 'true', so the onBlur function will know, that user 
// selected suggestion. onInputChange will make these variables 'false' again.
let originSelectedByUser, destinationSelectedByUser = false;





// Minimum and maximum number of parameters user must select
const PARAMETERS_MIN = 1;
const PARAMETERS_MAX = 6;

const numberOfNonZeroParams = (parameters) => {
    let count = 0;
    for (let parameter in parameters) {
        if (parameters[parameter]) count++;
    }
    return count;
};


class SearchPanel extends React.Component {
    state = {
        originInputValue: this.props.searchForm.originInputValue,
        originsSelectedId: this.props.searchForm.originsSelectedId,
        destinationInputValue: this.props.searchForm.destinationInputValue,
        destinationSelectedId: this.props.searchForm.destinationSelectedId,
        suggestOrigins: [],
        suggestDestinations: [],
        date: this.props.searchForm.date,
        calendarFocused: false,
        errorOriginInput: false,
        errorDestinationInput: false,
        errorParameters: false,
        parametersPanel: this.props.searchForm.parametersPanel,
        parametersValue: this.props.searchForm.parametersValue
    };



    /*************** Functions for Autosuggest inputs ***************/

    onOriginInputChange = (event, { newValue }) => {

        // Set originSelected to false
        originSelectedByUser = false;

        // First, update state with entered value
        this.setState(() => ({
            originInputValue: newValue,
            originsSelectedId: 0
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
        destinationSelectedByUser = false;

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

        if (!originSelectedByUser) {

            if (this.state.suggestOrigins.length !== 0) {
                this.setState(() => ({
                    originInputValue: this.state.suggestOrigins[0].nameEn,
                    originsSelectedId: this.state.suggestOrigins[0]._id,
                    errorOriginInput: false
                }), () => this.props.setSearchForm(this.state));
            } else {
                this.setState(() => ({
                    originInputValue: '',
                    originsSelectedId: 0
                }), () => this.props.setSearchForm(this.state));
            };
        } else {
            this.setState(() => ({
                errorOriginInput: false
            }));
        };
    };

    onDestinationInputBlur = () => {

        if (!destinationSelectedByUser) {

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
        originSelectedByUser = true;
        this.setState(() => ({
            originsSelectedId: suggestion._id
        }), () => this.props.setSearchForm(this.state));
    };

    onDestinationSuggestionSelected = (event, { suggestion }) => {
        destinationSelectedByUser = true;
        this.setState(() => ({
            destinationSelectedId: suggestion._id
        }), () => this.props.setSearchForm(this.state));
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

    onFormSubmit = (e) => {
        e.preventDefault();

        // Check that inputs are correct
        let errorOriginInput = false;
        let errorDestinationInput = false;
        let errorParameters = false;

        if (this.state.originInputValue === '') {
            errorOriginInput = true;
        };

        if (this.state.destinationInputValue === '' && !this.state.parametersPanel) {
            errorDestinationInput = true;
        };

        if (this.state.parametersPanel && numberOfNonZeroParams(this.state.parametersValue) < PARAMETERS_MIN) {
            errorParameters = true;
        } else {
            errorParameters = false;
        };

        this.setState(() => ({
            errorOriginInput,
            errorDestinationInput,
            errorParameters
        }));

        if (!(errorOriginInput || errorDestinationInput || errorParameters)) {

            // Find travels based on parameters
            if (this.state.parametersPanel) {
                this.props.startSearchTravelsByParameters(this.state.originsSelectedId, this.state.parametersValue, this.state.date.format('YYYY-MM-DD'));
            } else {
                this.props.startSearchTravelsByDestination(this.state.originsSelectedId, this.state.destinationSelectedId, this.state.date.format('YYYY-MM-DD'));
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
            errorOriginInput,
            date,
            calendarFocused,
            parametersPanel,
            errorParameters,
            parametersValue
        } = this.state;
        const originInputProps = {
            value: originInputValue,
            onChange: this.onOriginInputChange,
            onBlur: this.onOriginInputBlur,
            placeholder: 'City, airport'
        };
        const destinationInputProps = {
            value: destinationInputValue,
            onChange: this.onDestinationInputChange,
            onBlur: this.onDestinationInputBlur,
            disabled: parametersPanel,
            placeholder: 'City, airport'
        };

        return (<div className="search-form">
            <form 
                className="search-form__form"
                onSubmit={this.onFormSubmit}
            >
                <div className="search-form__input-group">
                    <InputAutosuggest
                        label="From:"
                        suggestions={suggestOrigins}
                        onSuggestionsFetchRequested={this.onOriginSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onOriginSuggestionsClearRequested}
                        inputProps={originInputProps}
                        focusInputOnSuggestionClick={false}
                        onSuggestionSelected={this.onOriginSuggestionSelected}
                        error={errorOriginInput}
                        errorText="Please enter origin"
                    />
                    <InputAutosuggest
                        label="To:"
                        suggestions={suggestDestinations}
                        onSuggestionsFetchRequested={this.onDestinationSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onDestinationSuggestionsClearRequested}
                        inputProps={destinationInputProps}
                        focusInputOnSuggestionClick={false}
                        onSuggestionSelected={this.onDestinationSuggestionSelected}
                        error={errorDestinationInput}
                        errorText="Please enter destination"
                    />
                </div>
                <div>
                    <InputDate
                        label="Date"
                        date={date}
                        onDateChange={this.onDateChange}
                        focused={calendarFocused}
                        onFocusChange={this.onCalendarFocusChange}
                        id="date_calendar_id"
                    />
                </div>
                <button>Find</button>
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
        </div>)


    };
};

const mapStateToProps = (state) => ({
    origins: state.originInput.origins,
    isFetchingOrigins: state.originInput.isFetching,
    destinations: state.destinationInput.destinations,
    isFetchingDestinations: state.destinationInput.isFetching,
    searchForm: state.searchForm
});

const mapDispatchToProps = (dispatch) => ({
    startSearchOrigins: (text) => dispatch(startSearchOrigins(text)),
    startSearchDestinations: (text) => dispatch(startSearchDestinations(text)),
    startSearchTravelsByParameters: (originId, parametersValue, date) => dispatch(startSearchTravelsByParameters(originId, parametersValue, date)),
    startSearchTravelsByDestination: (originId, destinationId, date) => dispatch(startSearchTravelsByDestination(originId, destinationId, date)),
    setSearchForm: (state) => dispatch(setSearchForm(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);