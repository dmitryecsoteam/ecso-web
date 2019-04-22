import travels from '../fixtures/travels';
import resultListSelector from '../../selectors/resultListSelector';

test('should sort by price desc', () => {
    const result = resultListSelector(travels, { sortBy: 'price', desc: true });
    expect(result).toMatchSnapshot();
});

test('should sort by price asc', () => {
    const result = resultListSelector(travels, { sortBy: 'price', desc: false });
    expect(result).toMatchSnapshot();
});

test('should sort by relevance desc', () => {
    const result = resultListSelector(travels, { sortBy: 'relevance', desc: true });
    expect(result).toMatchSnapshot();
});

test('should sort by relevance asc', () => {
    const result = resultListSelector(travels, { sortBy: 'relevance', desc: false });
    expect(result).toMatchSnapshot();
});