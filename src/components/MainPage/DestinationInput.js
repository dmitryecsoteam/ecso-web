import React from 'react';
import { startSearchDestinations } from '../../actions/destinationInputActions';
import { connect } from 'react-redux';
import selectDestinationSuggestions from '../../selectors/destinationInputSelector';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = (destination) => destination.name_en;

const renderSuggestion = (destinations) => (
    <span>
        {destinations.name_en}, {destinations.country_en}
    </span>
);

class DestinationInput extends React.Component {
    state = {
        enteredText: '',
        suggestDestinations: []
    };

    onChange = (event, { newValue }) => {

        // First, save previous enteredValue and update state with the new actual
        const prevValue = this.state.enteredText;
        this.setState({
            enteredText: newValue
        });

        // Second, check if it's the first letter in input and then fetch data from api
        if (this.state.enteredText === '') {
            this.props.startSearchDestinations(newValue).then(() => {
                this.setState({
                    suggestDestinations: selectDestinationSuggestions(this.props.destinations, this.state.enteredText)
                });
            });
        };
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestDestinations: selectDestinationSuggestions(this.props.destinations, value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestDestinations: []
        });
    };

    onSuggestionSelected = (obj) => {
        console.log("From onSuggestionSelected: ", obj);
    };

    render() {
        const { enteredText, suggestDestinations } = this.state;

        const inputProps = {
            value: enteredText,
            onChange: this.onChange
        };

        return <div>
            <Autosuggest
                suggestions={suggestDestinations}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={this.onSuggestionSelected}
                focusInputOnSuggestionClick={false}
            />
        </div>

    };
};

const mapStateToProps = (state) => ({
    destinations: state.destinationInput.destinations,
    isFetching: state.destinationInput.isFetching
});

const mapDispatchToProps = (dispatch) => ({
    startSearchDestinations: (text) => dispatch(startSearchDestinations(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(DestinationInput);