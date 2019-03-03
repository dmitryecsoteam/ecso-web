import { setOrigins, startFetchingOrigins, startSearchOrigins } from '../../actions/originInputActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { client } from '../../clientGraphQL/client';
import { ORIGIN_INPUT_SEARCH } from '../../queries/queries';

jest.mock('../../clientGraphQL/client.js');

const createMockStore = configureMockStore([thunk]);

test('should setup set origins action object', () => {

    const origins = ['Moscow', 'Tokyo'];
    const action = setOrigins(origins);

    expect(action).toEqual({
        type: 'SET_ORIGINS',
        origins
    });
});

test('should setup start fetching origins action object', () => {

    const action = startFetchingOrigins();

    expect(action).toEqual({
        type: 'START_FETCH_ORIGINS'
    });
});

test('should setup start search origins action', async () => {

    const store = createMockStore({});

    await store.dispatch(startSearchOrigins('T'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: 'START_FETCH_ORIGINS' });
    expect(actions[1]).toEqual({ type: 'SET_ORIGINS', origins: [ 'Tokyo' ] });

    expect(client.query).toHaveBeenCalledWith({
        query: ORIGIN_INPUT_SEARCH,
        variables: { startsWith: 'T' }
    });
});