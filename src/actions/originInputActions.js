import { client } from '../clientGraphQL/client';
import { ORIGIN_INPUT_SEARCH } from '../queries/queries';

export const setOrigins = (origins) => ({
    type: 'SET_ORIGINS',
    origins
});

export const startFetchingOrigins = () => ({
    type: 'START_FETCH_ORIGINS'
});



export const startSearchOrigins = (searchSymbol) => {
    return (dispatch) => {
        dispatch(startFetchingOrigins());

        return client.query({
            query: ORIGIN_INPUT_SEARCH,
            variables: { startsWith: searchSymbol }
        }).then((result) => {
            dispatch(setOrigins(result.data.originStartsWith));
        }
        );
    };
};