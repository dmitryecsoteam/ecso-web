import React from 'react';
import { startSearchOrigin } from '../../actions/originInputActions';
import { connect } from 'react-redux';
import selectOriginSuggestions from '../../selectors/originInputSelector';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = (origin) => origin.name_en;


const renderSuggestion = (origins) => (
    <span>
        {origins.name_en}, {origins.country_en}
    </span>
);

class OriginInput extends React.Component {
    state = {
        enteredText: '',
        suggestOrigins: []
    };

    onChange = (event, { newValue }) => {
        console.log("onChange", newValue);
        console.log("isFetching", this.props.isFetching);

        // First, save previous enteredValue and update state with the new actual
        const prevValue = this.state.enteredText;
        this.setState({
            enteredText: newValue
        });

        // Second, check if it's the first letter in input and then fetch data from api
        if ((prevValue === '')) {
            this.props.startSearchOrigin(newValue).then(() => {
                console.log("From promise ", this.props.origins);
                this.setState({
                    //enteredText: newValue,
                    suggestOrigins: selectOriginSuggestions(this.props.origins, this.state.enteredText)
                });
            });
         };
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestOrigins: selectOriginSuggestions(this.props.origins, value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestOrigins: []
        });
    };

    onSuggestionSelected = (obj) => {
        console.log("From onSuggestionSelected: ", obj);
    };



    render() {
        const { enteredText, suggestOrigins } = this.state;

        const inputProps = {
            value: enteredText,
            onChange: this.onChange
        };

        return <div>
            <Autosuggest
                suggestions={suggestOrigins}
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
    origins: state.originInput.origins,
    isFetching: state.originInput.isFetching
});

const mapDispatchToProps = (dispatch) => ({
    startSearchOrigin: (text) => dispatch(startSearchOrigin(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(OriginInput);