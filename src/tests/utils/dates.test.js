import moment from 'moment';
import { isBeforeDay, isInclusivelyAfterDay } from '../../utils/dates';

const today = moment();
const tomorrow = moment().add(1, 'days');

describe('isBeforeDay', () => {
    test('returns true if first arg is before the second but have same month and year', () => {
        expect(isBeforeDay(today, tomorrow)).toBeTruthy();
    });

    test('returns true if first arg is before the second but have same day and year', () => {
        expect(isBeforeDay(today, moment().clone().add(1, 'month'))).toBeTruthy();
    });

    test('returns true if first arg is before the second but have same day and month', () => {
        expect(isBeforeDay(today, moment().clone().add(1, 'year'))).toBeTruthy();
    });

    test('returns false if args are the same day', () => {
        expect(isBeforeDay(today, today)).toBeFalsy();
    });

    test('returns false if first arg is after the second', () => {
        expect(isBeforeDay(tomorrow, today)).toBeFalsy();
    });

    test('is false if first argument is not a moment object', () => {
        expect(isBeforeDay(null, today)).toBeFalsy();
    });

    test('is false if second argument is not a moment object', () => {
        expect(isBeforeDay(today, 'foo')).toBeFalsy();
    });
});

describe('isInclusivelyAfterDay', () => {
    test('returns true if first argument is after the second', () => {
        expect(isInclusivelyAfterDay(tomorrow, today)).toBeTruthy();
    });

    test('returns true for same day arguments', () => {
        expect(isInclusivelyAfterDay(today, today)).toBeTruthy();
    });

    test('returns false if first argument is before the second', () => {
        expect(isInclusivelyAfterDay(today, tomorrow)).toBeFalsy();
    });

    test('is false if first argument is not a moment object', () => {
        expect(isInclusivelyAfterDay(null, today)).toBeFalsy();
    });

    test('is false if second argument is not a moment object', () => {
        expect(isInclusivelyAfterDay(today, 'foo')).toBeFalsy();
    });
});