import suggestionsListSelector from '../../selectors/suggestionsListSelector';
import cities from '../fixtures/destinations';

test('should return empty array on empty input string', () => {
    const suggestions = suggestionsListSelector(cities, '');
    expect(suggestions).toEqual([]);
});

test('should return empty array when no match', () => {
    const suggestions = suggestionsListSelector(cities, 'Ъ');
    expect(suggestions).toEqual([]);
});

test('should return list of suggestions', () => {
    const suggestions = suggestionsListSelector(cities, 'ok');
    expect(suggestions).toMatchSnapshot();
});