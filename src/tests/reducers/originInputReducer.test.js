import originInputReducer from '../../reducers/originInputReducer';

const prevState = {
    origins: [],
    isFetching: false
};

test('should set empty state', () => {

    const state = originInputReducer(undefined, { type: '@INIT' });

    expect(state).toEqual({});

});

test('should set origins', () => {

    const origins = [{ _id: 1 }, { _id: 2 }];
    const action = {
        type: 'SET_ORIGINS',
        origins
    };
    const state = originInputReducer(prevState, action);

    expect(state).toEqual({
        origins,
        isFetching: false
    });

});

test('should start fetch origins', () => {

    const action = {
        type: 'START_FETCH_ORIGINS'
    };

    const state = originInputReducer(prevState, action);

    expect(state).toEqual({
        ...prevState,
        isFetching: true
    });

});