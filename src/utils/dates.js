let moment;
if (process.env.NODE_ENV === 'test') moment = jest.requireActual('moment');
else moment = require('moment');

export const isBeforeDay = (a, b) => {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

    const aYear = a.year();
    const aMonth = a.month();
  
    const bYear = b.year();
    const bMonth = b.month();
  
    const isSameYear = aYear === bYear;
    const isSameMonth = aMonth === bMonth;
  
    if (isSameYear && isSameMonth) return a.date() < b.date();
    if (isSameYear) return aMonth < bMonth;
    return aYear < bYear;
}

export const isInclusivelyAfterDay = (a, b) => {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    return !isBeforeDay(a, b);
}