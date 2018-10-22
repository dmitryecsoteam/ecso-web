import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import { startSearchOrigins } from '../../actions/originInputActions';
import { startSearchDestinations } from '../../actions/destinationInputActions';
import selectOriginSuggestions from '../../selectors/originInputSelector';
import selectDestinationSuggestions from '../../selectors/destinationInputSelector';
import Parameter from './Parameter';


const getSuggestionValue = (suggestion) => (suggestion.name_en);

const renderSuggestion = (suggestion) => (
    <span>
        {suggestion.name_en}, {suggestion.country_en}
    </span>
);




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
        parametersPanel: false,
        parameterValue: 0
    };

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
                this.setState({
                    suggestOrigins: selectOriginSuggestions(this.props.origins, this.state.originInputValue)
                });
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
                this.setState({
                    suggestDestinations: selectDestinationSuggestions(this.props.destinations, this.state.destinationInputValue)
                });
            });
        };
    };

    onOriginInputBlur = () => {

        if (!originSelected) {

            if (this.state.suggestOrigins.length !== 0) {
                this.setState({
                    originInputValue: this.state.suggestOrigins[0].name_en
                });
            } else {
                this.setState({
                    originInputValue: ''
                });
            };
        };
    };

    onDestinationInputBlur = () => {

        if (!destinationSelected) {

            if (this.state.suggestDestinations.length !== 0) {
                this.setState({
                    destinationInputValue: this.state.suggestDestinations[0].name_en
                });
            } else {
                this.setState(() => ({
                    destinationInputValue: ''
                }));
            };
        };
    };

    onOriginSuggestionSelected = () => {
        originSelected = true;
    };

    onDestinationSuggestionSelected = () => {
        destinationSelected = true;
    };

    onOriginSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestOrigins: selectOriginSuggestions(this.props.origins, value)
        });
    };

    onDestinationSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestDestinations: selectDestinationSuggestions(this.props.destinations, value)
        });
    };

    onOriginSuggestionsClearRequested = () => {
        this.setState({
            suggestOrigins: []
        });
    };

    onDestinationSuggestionsClearRequested = () => {
        this.setState({
            suggestDestinations: []
        });
    };

    onDateChange = (date) => {
        this.setState({
            date
        });
    };

    onCalendarFocusChange = ({ focused }) => {
        this.setState(() => ({
            calendarFocused: focused
        }));
    };

    onFormSubmit = (e) => {
        e.preventDefault();

        if (this.state.originInputValue === '') {
            this.setState(() => ({
                errorOriginInput: true
            }));
        };

        if (this.state.destinationInputValue === '') {
            this.setState(() => ({
                errorDestinationInput: true
            }));
        };
    };

    parametersOnClick = () => {
        this.setState((state) => ({
            parametersPanel: !state.parametersPanel
        }));
    }

    onParameterChange = (parameterValue) => {
        this.setState(() => ({
            parameterValue
        }));
    }





    render() {
        const { originInputValue, destinationInputValue, suggestOrigins, suggestDestinations } = this.state;
        const originInputProps = {
            value: originInputValue,
            onChange: this.onOriginInputChange,
            onBlur: this.onOriginInputBlur
        };
        const destinationInputProps = {
            value: destinationInputValue,
            onChange: this.onDestinationInputChange,
            onBlur: this.onDestinationInputBlur,
            disabled: this.state.parametersPanel
        };

        return (<div>
            <form onSubmit={this.onFormSubmit}>
                <div>
                    <label>FROM</label>
                    <Autosuggest
                        suggestions={suggestOrigins}
                        onSuggestionsFetchRequested={this.onOriginSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onOriginSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={originInputProps}
                        focusInputOnSuggestionClick={false}
                        onSuggestionSelected={this.onOriginSuggestionSelected}
                    />
                    {this.state.errorOriginInput && <span>Please enter origin</span>}
                </div>
                <div>
                    <label>TO</label>
                    <Autosuggest
                        suggestions={suggestDestinations}
                        onSuggestionsFetchRequested={this.onDestinationSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onDestinationSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={destinationInputProps}
                        focusInputOnSuggestionClick={false}
                        onSuggestionSelected={this.onDestinationSuggestionSelected}
                    />
                    {this.state.errorDestinationInput && <span>Please enter destination</span>}
                </div>
                <div>
                    <label>DATE</label>
                    <SingleDatePicker
                        date={this.state.date}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onCalendarFocusChange}
                        id="date_calendar_id"
                    />
                </div>
                <button>Find</button>
                <div>
                    {this.state.parametersPanel && <div>parameters</div>}
                    <div onClick={this.parametersOnClick}>
                        <span>{(this.state.parametersPanel && 'Press to hide parameters') || (!this.state.parametersPanel && 'Press to show parameters')}</span>
                    </div>
                </div>
                <Parameter
                    parameter="Test parameter name"
                    value={this.state.parameterValue}
                    onChange={this.onParameterChange}
                />
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