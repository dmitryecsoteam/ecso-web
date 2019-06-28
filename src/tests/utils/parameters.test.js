import { numberOfNonZeroParams } from '../../utils/parameters';

const parameters = {
    Beach: 5,
    Food: 3,
    Museum: 0,
    Nature: 0,
    Shopping: 2,
    Nightlife: 0
};

test('should return 3', () => {
    expect(numberOfNonZeroParams(parameters)).toBe(3);
});