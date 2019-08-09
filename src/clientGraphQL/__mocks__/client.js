import { ORIGIN_INPUT_SEARCH_EN, DESTINATION_INPUT_SEARCH_EN, DESTINATION_SEARCH_BY_PARAMETERS, TRAVELS_SEARCH_EN, GET_NOTIFICATIONS } from '../../queries/queries';
import travel from '../../tests/fixtures/travel';

export const client = {
    query: jest.fn(({ query, variables }) => {

        switch (query) {

            case (DESTINATION_INPUT_SEARCH_EN): return Promise.resolve({ data: {
                destinationStartsWith: ['Osaka']
            }});

            case (ORIGIN_INPUT_SEARCH_EN): return Promise.resolve({ data: {
                originStartsWith: ['Tokyo']
            }});

            case (DESTINATION_SEARCH_BY_PARAMETERS): {

                switch (variables.beachRating) {
                    case 1: return Promise.resolve({ data: {
                        destinationRating: []
                    }});
                    case 2: return Promise.resolve({ data: {
                        destinationRating: [{ _id: 2 }]
                    }});
                    case 3: return Promise.resolve({ data: {
                        destinationRating: [{ _id: 1 }, { _id: 3 }]
                    }});
                }

            }

            case (TRAVELS_SEARCH_EN): {

                switch (variables.destination) {
                    case 2: return Promise.resolve({ data: {
                        travel: null
                    }});
                    case 3: return Promise.resolve({ data: {
                        travel
                    }});
                }
            }

            case (GET_NOTIFICATIONS): {
                return { data: { getNotifications: [{ travelId: "In notifications"}]}}
            }
        }
        })
}

