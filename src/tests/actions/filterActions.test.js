import { setFilter } from '../../actions/filterActions';

test('should setup set filter action object', () => {
    const sortBy = 'price';
    const desc = false;

    const action = setFilter(sortBy, desc);
    expect(action).toEqual({
        type: 'SET_FILTER',
        sortBy,
        desc
    });
});