import destinationInputReducer from '../../reducers/destinationInputReducer';

const prevState = {
    destinations: [],
    isFetching: false
};

test('should set empty state', () => {

    const state = destinationInputReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({});
});

test('should set destinations', () => {
    
    const destinations = [{ _id: 1 }, { _id: 2 }];
    const action = {
        type: 'SET_DESTINATIONS',
        destinations
    };
    const state = destinationInputReducer(prevState, action);

    expect(state).toEqual({
        destinations,
        isFetching: false
    });
});

test('should start fetching destinations', () => {

    const action = {
        type: 'START_FETCH_DESTINATIONS'
    };
    const state = destinationInputReducer(prevState, action);

    expect(state).toEqual({
        ...prevState,
        isFetching: true
    });
});