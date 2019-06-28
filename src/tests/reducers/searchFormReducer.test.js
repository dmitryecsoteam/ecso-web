import searchFormReducer from '../../reducers/searchFormReducer';
import moment from 'moment';

const prevState = {
    originInputValue: 'Tokyo',
    originsSelectedId: 1,
    destinationInputValue: '',
    destinationSelectedId: 0,
    date: moment(),
    parametersPanel: true,
    parametersValue: {
        Beach: 1,
        Food: 2,
        Museums: 3,
        Nature: 4,
        Shopping: 5,
        Nightlife: 0
    }
};

test('should set empty state', () => {

    const state = searchFormReducer(undefined, { type: '@INIT' });

    expect(state).toEqual({});

});

test('should set search form', () => {

    const searchForm = {
        originInputValue: 'Osaka',
        originsSelectedId: 2,
        destinationInputValue: 'Nagoya',
        destinationSelectedId: 3,
        date: moment(),
        parametersPanel: false,
        parametersValue: {
            Beach: 0,
            Food: 5,
            Museums: 4,
            Nature: 3,
            Shopping: 2,
            Nightlife: 1
        }
    };
    const action = {
        type: 'SET_SEARCH_FORM',
        ...searchForm
    };
    const state = searchFormReducer(prevState, action);

    expect(state).toEqual({
        ...searchForm
    });
});