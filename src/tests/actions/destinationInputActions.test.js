import { setDestinations, startFetchingDestinations, startSearchDestinations } from '../../actions/destinationInputActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { client } from '../../clientGraphQL/client';
import { DESTINATION_INPUT_SEARCH_EN } from '../../queries/queries';

jest.mock('../../clientGraphQL/client.js');

const createMockStore = configureMockStore([thunk]);

test('should setup set destinations action object', () => {

    const destinations = ['Tokyo', 'Toyama'];
    const action = setDestinations(destinations);

    expect(action).toEqual({
        type: 'SET_DESTINATIONS',
        destinations: ['Tokyo', 'Toyama']
    });
});

test('should setup start fetching destinations action object', () => {
    
    const action = startFetchingDestinations();

    expect(action).toEqual({
        type: 'START_FETCH_DESTINATIONS'
    });
});

test('should setup start search destinations action',  async () => {

    const store = createMockStore({});

    await store.dispatch(startSearchDestinations('O'));
    const actions = store.getActions();
    
    expect(actions[0]).toEqual({ type: 'START_FETCH_DESTINATIONS' });
    expect(actions[1]).toEqual({ type: 'SET_DESTINATIONS', destinations: [ 'Osaka' ] });

    expect(client.query).toHaveBeenCalledWith({
        query: DESTINATION_INPUT_SEARCH_EN,
        variables: { startsWith: 'O' }
    });
});