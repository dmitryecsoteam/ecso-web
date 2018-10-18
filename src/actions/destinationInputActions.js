import { client } from '../clientGraphQL/client';
import { DESTINATION_INPUT_SEARCH } from '../queries/queries';

export const setDestinations = (destinations) => ({
    type: 'SET_DESTINATIONS',
    destinations
});

export const startFetchingDestinations = () => ({
    type: 'START_FETCH'
});


export const startSearchDestinations = (searchSymbol) => {
    return (dispatch) => {
        dispatch(startFetchingDestinations());

        return client.query({
            query: DESTINATION_INPUT_SEARCH,
            variables: { name: searchSymbol }
        }).then((result) => {
            dispatch(setDestinations(result.data.destinationStartsWith));
        }
        );
    };
};