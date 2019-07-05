import minutesToHours from '../../utils/minutesToHours';

test('should calculate minutes into hours/minutes', () => {
    expect(minutesToHours(60)).toEqual('1 hr 0 min');
    expect(minutesToHours(305)).toEqual('5 hr 5 min');
});