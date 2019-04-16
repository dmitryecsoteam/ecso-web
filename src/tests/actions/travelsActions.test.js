import { setTravels, startFetchingTravels, startSearchTravelsByParameters, startSearchTravelsByDestination } from '../../actions/travelsActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { client } from '../../clientGraphQL/client';
import { DESTINATION_SEARCH_BY_PARAMETERS, TRAVELS_SEARCH_EN } from '../../queries/queries';
import travel from '../fixtures/travel';

jest.mock('../../clientGraphQL/client.js');

const createMockStore = configureMockStore([thunk]);

test('should setup set travels action object', () => {

    const travels = [{ _id: 123, origin: 1, destination: 4}, { _id: 55, origin: 5, destination: 55}];
    const action = setTravels(travels);

    expect(action).toEqual({
        type: 'SET_TRAVELS',
        travels
    });
});

test('should setup start fetching action object', () => {

    const action = startFetchingTravels();

    expect(action).toEqual({
        type: 'START_FETCH_TRAVELS'
    });
});

test('should setup search travels by parameters action. Case 1: no destinations found', async () => {

    const store = createMockStore({});

    const origin = 1;
    const parametersValue = {
        Beach: 1,
        Food: 2,
        Museum: 3,
        Nature: 4,
        Shopping: 5,
        Nightlife: 0
    };
    const date = '2019-01-01';
    await store.dispatch(startSearchTravelsByParameters(origin, parametersValue, date));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
        type: 'START_FETCH_TRAVELS'
    });
    expect(actions[1]).toEqual({
        type: 'SET_TRAVELS',
        travels: []
    });

    expect(client.query).toHaveBeenCalledWith({
        query: DESTINATION_SEARCH_BY_PARAMETERS,
        variables: {
            beachRating: 1,
            foodRating: 2,
            museumRating: 3,
            natureRating: 4,
            shoppingRating: 5,
            nightlifeRating: 0
        }
    });

    client.query.mockClear();

});

test('should setup search travels by parameters action. Case 2: no travels found', async () => {

    const store = createMockStore({});

    const origin = 1;
    const parametersValue = {
        Beach: 2,
        Food: 2,
        Museum: 3,
        Nature: 4,
        Shopping: 5,
        Nightlife: 0
    };
    const date = '2019-01-01';
    await store.dispatch(startSearchTravelsByParameters(origin, parametersValue, date));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
        type: 'START_FETCH_TRAVELS'
    });
    expect(actions[1]).toEqual({
        type: 'SET_TRAVELS',
        travels: []
    });

    expect(client.query).toHaveBeenCalledWith({
        query: DESTINATION_SEARCH_BY_PARAMETERS,
        variables: {
            beachRating: 2,
            foodRating: 2,
            museumRating: 3,
            natureRating: 4,
            shoppingRating: 5,
            nightlifeRating: 0
        }
    });
    expect(client.query).toHaveBeenCalledWith({
        query: TRAVELS_SEARCH_EN,
        variables: {
            origin,
            destination: 2,
            date
        }
    });

    client.query.mockClear();

});

test('should setup search travels by parameters action. Case 3: travels and destinations found, one of destinations equals origin', async () => {

    const store = createMockStore({});

    const origin = 1;
    const parametersValue = {
        Beach: 3,
        Food: 2,
        Museum: 3,
        Nature: 4,
        Shopping: 5,
        Nightlife: 0
    };
    const date = '2020-01-01';
    await store.dispatch(startSearchTravelsByParameters(origin, parametersValue, date));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
        type: 'START_FETCH_TRAVELS'
    });
    expect(actions[1]).toEqual({
        type: 'SET_TRAVELS',
        travels: [travel]
    });

    expect(client.query).toHaveBeenCalledWith({
        query: DESTINATION_SEARCH_BY_PARAMETERS,
        variables: {
            beachRating: 3,
            foodRating: 2,
            museumRating: 3,
            natureRating: 4,
            shoppingRating: 5,
            nightlifeRating: 0
        }
    });
    expect(client.query).toHaveBeenCalledWith({
        query: TRAVELS_SEARCH_EN,
        variables: {
            origin,
            destination: 3,
            date
        }
    });
    expect(client.query).toHaveBeenCalledTimes(2);

    client.query.mockClear();

});

test('should setup start search travels by destination action. Case 1: no travel found', async () => {

    const store = createMockStore({});
    
    const origin = 1;
    const destination = 2;
    const date = '2020-01-01';
    await store.dispatch(startSearchTravelsByDestination(origin, destination, date));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
        type: 'START_FETCH_TRAVELS'
    });
    expect(actions[1]).toEqual({
        type: 'SET_TRAVELS',
        travels: []
    });

    expect(client.query).toHaveBeenCalledWith({
        query: TRAVELS_SEARCH_EN,
        variables: {
            origin,
            destination: 2,
            date
        }
    });

    client.query.mockClear();

});

test('should setup start search travels by destination action. Case 2: travel found', async () => {

    const store = createMockStore({});
    
    const origin = 1;
    const destination = 3;
    const date = '2020-01-01';
    await store.dispatch(startSearchTravelsByDestination(origin, destination, date));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
        type: 'START_FETCH_TRAVELS'
    });
    expect(actions[1]).toEqual({
        type: 'SET_TRAVELS',
        travels: [travel]
    });

    expect(client.query).toHaveBeenCalledWith({
        query: TRAVELS_SEARCH_EN,
        variables: {
            origin,
            destination: 3,
            date
        }
    });

    client.query.mockClear();

});