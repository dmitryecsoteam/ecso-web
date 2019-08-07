import { client } from '../clientGraphQL/client';
import { DESTINATION_SEARCH_BY_PARAMETERS, TRAVELS_SEARCH_EN } from '../queries/queries';

//const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))

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
            museumRating: parametersValue['Museum'],
            natureRating: parametersValue['Nature'],
            shoppingRating: parametersValue['Shopping'],
            nightlifeRating: parametersValue['Nightlife']
        };
        
        return client.query({
            query: DESTINATION_SEARCH_BY_PARAMETERS,
            variables
        }).then((response) => {

            let promises = [];

            

            response.data.destinationRating.forEach((destination) => {
                
                // Origin must not be equal to destination
                if (destination._id !== origin) {
                    promises.push(
                        client.query({
                            query: TRAVELS_SEARCH_EN,
                            variables: {
                                origin,
                                destination: destination._id,
                                date
                            }
                        }));
                }
            });

            return Promise.all(promises).then((response) => {
                let travels = [];
                response.forEach(({ data }) => {
                    
                    // If data.travel is not null (not found in DB)
                    if (data.travel) travels.push(data.travel);
                });
                dispatch(setTravels(travels));
            });
        });
    };
};

export const startSearchTravelsByDestination = (origin, destination, date) => {
    return (dispatch) => {
        dispatch(startFetchingTravels());

        return client.query({
            query: TRAVELS_SEARCH_EN,
            variables: {
                origin,
                destination,
                date
            }
        }).then(({ data }) => {

            const travels = [];
            
            // If travel is not null (not found in DB)
            if (data.travel) travels.push(data.travel);
            
            dispatch(setTravels(travels));
        });
    };
};