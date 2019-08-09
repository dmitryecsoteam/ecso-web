export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_ERROR_ID':
            return {
                errorTravelId: action.travelId
            };
        case 'CLEAR_ERROR_ID':
            return {
                errorTravelId: ''
            };
        default: return state;
    }
}