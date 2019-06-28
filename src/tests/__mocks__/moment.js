const moment = jest.requireActual('moment');

const momentMock = (time = 0) => {
    return moment(time);
}

momentMock.isMoment = () => true;

//momentMock.locale = () => {};

export default momentMock;