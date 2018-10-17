import React from 'react';
import { startSearchOrigin } from '../../actions/originInputActions';
import { connect } from 'react-redux';
import selectOriginSuggestions from '../../selectors/originInputSelector';
import store from '../../store/ReduxStore';
import Autosuggest from 'react-autosuggest';

const getSuggestions = (value) => {

    const regex = new RegExp('\\b' + value.trim(), 'i');

    return origins.filter(origin => regex.test(getSuggestionValue(origin)));
}

const getSuggestionValue = (origin) => origin.name;


const renderSuggestion = (origins) => (
    <div>
        {origins.name}, {origins.country}
    </div>
);

class OriginInput extends React.Component {
    state = {
        enteredText: '',
        suggestOrigins: []
    };

    onChange = (event, { newValue }) => {
        console.log("onChange", newValue);

        if (this.state.enteredText === '') {
            this.props.startSearchOrigin(newValue).then(() => {
                console.log("From promise ", this.props.origins);
                this.setState({
                    enteredText: newValue,
                    suggestOrigins: selectOriginSuggestions(this.props.origins, newValue)
                });
            });
        } else {
            this.setState({
                enteredText: newValue
            });
        }
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestOrigins: selectOriginSuggestions(this.props.origins, value)
        });
    }

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