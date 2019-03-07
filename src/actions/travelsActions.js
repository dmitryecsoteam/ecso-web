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

        const variables = {
            beachRating: parametersValue['Beach'],
            foodRating: parametersValue['Food'],
            museumRating: parametersValue['Museums'],
            natureRating: parametersValue['Nature'],
            shoppingRating: parametersValue['Shopping'],
            nightlifeRating: parametersValue['Nightlife']
        };

        client.query({
            query: DESTINATION_SEARCH_BY_PARAMETERS,
            variables
        }).then((response) => {

            let promises = [];

            response.data.destinationRating.forEach((destination) => {
                
                // Origin must not be equal to destination
                if (destination._id !== origin) {
                    promises.push(
                        client.query({
                            query: TRAVELS_SEARCH,
                            variables: {
                                origin,
                                destination: destination._id,
                                date
                            }
                        }));
                }
            });

            Promise.all(promises).then((response) => {
                console.log(response)
                let travels = [];
                response.forEach(({ data }) => {
                    travels.push(data.travel);
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