import { setSearchForm } from '../../actions/searchFormActions';

test('should setup search form action object', () => {

    const form = {
        originInputValue: 'Tokyo',
        originsSelectedId: 3,
        destinationInputValue: 'Osaka',
        destinationSelectedId: 5,
        date: '2019-01-01',
        parametersPanel: false,
        parametersValue: [0, 0, 0, 0]
    }
    const action = setSearchForm({
        ...form,
        wrongProperty: true
    });

    expect(action).toEqual({
        type: 'SET_SEARCH_FORM',
        ...form
    });
});