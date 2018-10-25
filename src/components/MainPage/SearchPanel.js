import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import moment from 'moment';


import { startSearchOrigins } from '../../actions/originInputActions';
import { startSearchDestinations } from '../../actions/destinationInputActions';
import selectOriginSuggestions from '../../selectors/originInputSelector';
import selectDestinationSuggestions from '../../selectors/destinationInputSelector';

import Parameter from './Parameter';
import InputAutosuggest from './InputTextAutosuggest';
import InputDate from './InputDate';
import ParametersPanel from './ParametersPanel';






// If user focused out from the input and didn't choose any suggestion, then the first item of the suggestions array
// would be picked up and set as input value; if suggestions array is empty - empty string ('') will be set as input value.
// If user selected suggestion, then this suggestion would be set as input value and the input 
// would be focused out (Autosuggest's prop focusInputOnSuggestionClick={false}).
//
// This variables (originSelected, destinationSelected) will let onBlur event know, if user selected suggestion or not.
// We can't make this variables part of the component's state, because setState function is ASYNC
// and when onBlur event is fired the state won't be actual.
// We need some SYNC logic:
// onSuggestionSelected change originSelected/destinationSelected to 'true', so the onBlur function will know, that user 
// selected suggestion. onInputChange will make these fariables 'false' again.
let originSelected, destinationSelected = false;



// The array of parameters - order is important for render and parametersValue array in state
const parametersArray = [{
    id: 0,
    name: 'Beach'
}, {
    id: 1,
    name: 'Food'
}, {
    id: 2,
    name: 'Historical'
}, {
    id: 3,
    name: 'Mountains'
}, {
    id: 4,
    name: 'Museums'
}, {
    id: 5,
    name: 'Nature'
}, {
    id: 6,
    name: 'Shopping'
}, {
    id: 7,
    name: 'Wellness & spa'
}, {
    id: 8,
    name: 'Zoo & aqua'
}];

// Minimum and maximum number of parameters user must select
const parametersMin = 3;
const parametersMax = 5;

const numberOfNonZeroParams = (array) => {
    let count = 0;
    array.forEach(element => {
        if (element) { count++ };
    });
    return count;
};


class SearchPanel extends React.Component {
    state = {
        originInputValue: '',
        originSelected: false,
        destinationInputValue: '',
        destinationSelected: false,
        suggestOrigins: [],
        suggestDestinations: [],
        date: moment(),
        calendarFocused: false,
        errorOriginInput: false,
        errorDestinationInput: false,
        errorParameters: false,
        parametersPanel: false,
        parametersValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        parametersEntered: 0
    };



    /*************** Functions for Autosuggest inputs ***************/

    onOriginInputChange = (event, { newValue }) => {

        // Set originSelected to false
        originSelected = false;

        // Save previous enteredValue and update state with the new actual
        const prevValue = this.state.originInputValue;
        this.setState(() => ({
            originInputValue: newValue
        }));

        // Check if it's the first letter in input and then fetch data from api
        if ((prevValue === '')) {
            this.props.startSearchOrigins(newValue).then(() => {
                this.setState(() => ({
                    suggestOrigins: selectOriginSuggestions(this.props.origins, this.state.originInputValue)
                }));
            });
        };
    };

    onDestinationInputChange = (event, { newValue }) => {

        // Set destinationSelected to false
        destinationSelected = false;

        // Save previous enteredValue and update state with the new actual
        const prevValue = this.state.destinationInputValue;
        this.setState(() => ({
            destinationInputValue: newValue
        }));

        // Check if it's the first letter in input and then fetch data from api
        if ((prevValue === '')) {
            this.props.startSearchDestinations(newValue).then(() => {
                this.setState(() => ({
                    suggestDestinations: selectDestinationSuggestions(this.props.destinations, this.state.destinationInputValue)
                }));
            });
        };
    };

    onOriginInputBlur = () => {

        if (!originSelected) {

            if (this.state.suggestOrigins.length !== 0) {
                this.setState(() => ({
                    originInputValue: this.state.suggestOrigins[0].name_en,
                    errorOriginInput: false
                }));
            } else {
                this.setState(() => ({
                    originInputValue: ''
                }));
            };
        } else {
            this.setState(() => ({
                errorOriginInput: false
            }));
        };
    };

    onDestinationInputBlur = () => {

        if (!destinationSelected) {

            if (this.state.suggestDestinations.length !== 0) {
                this.setState(() => ({
                    destinationInputValue: this.state.suggestDestinations[0].name_en,
                    errorDestinationInput: false
                }));
            } else {
                this.setState(() => ({
                    destinationInputValue: ''
                }));
            };
        } else {
            this.setState(() => ({
                errorDestinationInput: false
            }));
        };
    };

    onOriginSuggestionSelected = () => {
        originSelected = true;
    };

    onDestinationSuggestionSelected = () => {
        destinationSelected = true;
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
        }));
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
        }));
    };

    onParameterChange = (value, id) => {
        this.setState((prevState) => {

            prevState.parametersValue[id] = value;

            return ({
                parametersValue: prevState.parametersValue,
                parametersEntered: numberOfNonZeroParams(prevState.parametersValue)
            });
        });
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

        if (this.state.parametersPanel && this.state.parametersEntered < parametersMin) {
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
            console.log('Start fetching from db');
        }




        if (this.state.originInputValue === '') {
            this.setState(() => ({
                errorOriginInput: true
            }));
        };

        if (this.state.destinationInputValue === '' && !this.state.parametersPanel) {
            this.setState(() => ({
                errorDestinationInput: true
            }));
        };

        if (this.state.parametersPanel && this.state.parametersEntered < parametersMin) {
            this.setState(() => ({
                errorParameters: true
            }));
        } else {
            this.setState(() => ({
                errorParameters: false
            }));
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
            parametersValue,
            parametersEntered
        } = this.state;
        const originInputProps = {
            value: originInputValue,
            onChange: this.onOriginInputChange,
            onBlur: this.onOriginInputBlur
        };
        const destinationInputProps = {
            value: destinationInputValue,
            onChange: this.onDestinationInputChange,
            onBlur: this.onDestinationInputBlur,
            disabled: parametersPanel
        };

        return (<div>
            <form onSubmit={this.onFormSubmit}>
                <div>
                    <InputAutosuggest
                        label="From"
                        suggestions={suggestOrigins}
                        onSuggestionsFetchRequested={this.onOriginSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onOriginSuggestionsClearRequested}
                        inputProps={originInputProps}
                        focusInputOnSuggestionClick={false}
                        onSuggestionSelected={this.onOriginSuggestionSelected}
                        error={errorOriginInput}
                        errorText="Please enter origin"
                    />
                </div>
                <div>
                    <InputAutosuggest
                        label="To"
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
                        parametersArray={parametersArray}
                        parametersEntered={parametersEntered}
                        parametersMax={parametersMax}
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
    isFetchingDestinations: state.destinationInput.isFetching
});

const mapDispatchToProps = (dispatch) => ({
    startSearchOrigins: (text) => dispatch(startSearchOrigins(text)),
    startSearchDestinations: (text) => dispatch(startSearchDestinations(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);