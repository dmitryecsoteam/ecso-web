import { ORIGIN_INPUT_SEARCH, DESTINATION_INPUT_SEARCH } from '../../queries/queries';

export const client = {
    query: jest.fn(({ query }) => {
        switch (query) {
            case (DESTINATION_INPUT_SEARCH): return Promise.resolve({ data: {
                destinationStartsWith: ['Osaka']
            }});
            case (ORIGIN_INPUT_SEARCH): return Promise.resolve({ data: {
                originStartsWith: ['Tokyo']
            }});
        }
        })
}

