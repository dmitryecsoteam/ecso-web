import travelsReducer from '../../reducers/travelsReducer';

const prevState = {
    result: [],
    isFetching: false,
    isInitEmptyResult: true
}

test('should set empty state', () => {

    const state = travelsReducer(undefined, { type: '@INIT' });

    expect(state).toEqual({});
});

test('should set travels', () => {

    const travels = [{ _id: 1 }, { _id: 2 }];
    const action = {
        type: 'SET_TRAVELS',
        travels
    };
    const state = travelsReducer(prevState, action);

    expect(state).toEqual({
        result: travels,
        isFetching: false,
        isInitEmptyResult: false
    });
});

test('should start fetching travels', () => {

    const action = {
        type: 'START_FETCH_TRAVELS'
    };
    const state = travelsReducer(prevState, action);

    expect(state).toEqual({
        ...prevState,
        isFetching: true
    });
});