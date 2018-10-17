import { client } from '../clientGraphQL/client';
import { ORIGIN_INPUT_SEARCH } from '../queries/queries';

export const setOrigins = (origins) => ({
    type: 'SET_ORIGINS',
    origins
});

export const startFetchingOrigins = () => ({
    type: 'START_FETCH'
});



export const startSearchOrigin = (searchSymbol) => {
    return (dispatch) => {
        dispatch(startFetchingOrigins());

        return client.query({
            query: ORIGIN_INPUT_SEARCH,
            variables: { name: searchSymbol }
        }).then((result) => {
            console.log(result);
            dispatch(setOrigins(result.data.originStartsWith));
        }
        );
    };
};