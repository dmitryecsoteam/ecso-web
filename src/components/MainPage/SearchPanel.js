import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { startSearchOrigins } from '../../actions/originInputActions';
import { startSearchDestinations } from '../../actions/destinationInputActions';
import selectOriginSuggestions from '../../selectors/originInputSelector';
import selectDestinationSuggestions from '../../selectors/destinationInputSelector';


const getSuggestionValue = (suggestion) => (suggestion.name_en);

const renderSuggestion = (suggestion) => (
    <span>
        {suggestion.name_en}, {suggestion.country_en}
    </span>
);



class SearchPanel extends React.Component {
    state = {
        originInputValue: '',
        destinationInputValue: '',
        suggestOrigins: [],
        suggestDestinations: []
    };

    onOriginInputChange = (event, { newValue }) => {
        // First, save previous enteredValue and update state with the new actual
        const prevValue = this.state.originInputValue;
        this.setState({
            originInputValue: newValue
        });

        // Second, check if it's the first letter in input and then fetch data from api
        if ((prevValue === '')) {
            this.props.startSearchOrigins(newValue).then(() => {
                this.setState({
                    suggestOrigins: selectOriginSuggestions(this.props.origins, this.state.originInputValue)
                });
            });
        };
    };

    onDestinationInputChange = (event, { newValue }) => {
        // First, save previous enteredValue and update state with the new actual
        const prevValue = this.state.destinationInputValue;
        this.setState({
            destinationInputValue: newValue
        });

        // Second, check if it's the first letter in input and then fetch data from api
        if ((prevValue === '')) {
            this.props.startSearchDestinations(newValue).then(() => {
                this.setState({
                    suggestDestinations: selectDestinationSuggestions(this.props.destinations, this.state.destinationInputValue)
                });
            });
        };
    };

    onOriginInputBlur = (event) => {
        //const suggestOrigins = selectOriginSuggestions(this.props.origins, this.state.originInputValue);

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

    onOriginSuggestionSelected = (obj) => {
        console.log("From onSuggestionSelected: ", obj);
    };

    onDestinationSuggestionSelected = (obj) => {
        console.log("From onSuggestionSelected: ", obj);
    };


    render() {
        const { originInputValue, destinationInputValue, suggestOrigins, suggestDestinations } = this.state;
        const originInputProps = {
            value: originInputValue,
            onChange: this.onOriginInputChange,
            onBlur: this.onOriginInputBlur
        };
        const destinationInputProps = {
            value: destinationInputValue,
            onChange: this.onDestinationInputChange
        };

        return (<div>
            <form>
                <div>
                    <label>FROM</label>
                    <Autosuggest
                        suggestions={suggestOrigins}
                        onSuggestionsFetchRequested={this.onOriginSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onOriginSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={originInputProps}
                        onSuggestionSelected={this.onOriginSuggestionSelected}
                        focusInputOnSuggestionClick={false}
                    />
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
                        onSuggestionSelected={this.onDestinationSuggestionSelected}
                        focusInputOnSuggestionClick={false}
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