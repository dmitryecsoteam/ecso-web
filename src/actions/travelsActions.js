import { client } from '../clientGraphQL/client';
import { DESTINATION_SEARCH_BY_PARAMETERS, TRAVELS_SEARCH } from '../queries/queries';

export const setTravels = (travels) => ({
    type: 'SET_TRAVELS',
    travels
});

export const startFetchingTravels = () => ({
    type: 'START_FETCH_TRAVELS'
});

export const startSearchTravelsByParameters = (origin, parametersValue, date) => {
    return (dispatch) => {
        dispatch(startFetchingTravels());

        client.query({
            query: DESTINATION_SEARCH_BY_PARAMETERS,
            variables: {
                beachRating: parametersValue[0],
                foodRating: parametersValue[1],
                historicalRating: parametersValue[2],
                mountainsRating: parametersValue[3],
                museumRating: parametersValue[4],
                natureRating: parametersValue[5],
                shoppingRating: parametersValue[6],
                wellnessSpaRating: parametersValue[7],
                zooAquaRating: parametersValue[8]
            }
        }).then((response) => {
            let promises = [];

            response.data.destinationRating.forEach((destination) => {
                promises.push(
                    client.query({
                        query: TRAVELS_SEARCH,
                        variables: {
                            origin,
                            destination: destination._id,
                            date
                        }
                }));
            });
            
            Promise.all(promises).then((response) => {
                let travels = [];
                response.forEach(({ data }) => {
                    travels.push(data);
                });
                dispatch(setTravels(travels));
            });
        });
    };
};

export const startSearchTravelsByDestination = (origin, destination, date) => {
    return (dispatch) => {
        dispatch(startFetchingTravels());

        client.query({
            query: TRAVELS_SEARCH,
            variables: {
                origin,
                destination,
                date
            }
        }).then((response) => {
            dispatch(setTravels([response.data.travel]));
        });
    };
};