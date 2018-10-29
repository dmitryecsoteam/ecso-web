export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_TRAVELS':
            return {
                result: action.travels,
                isFetching: false
            };
        case 'START_FETCH_TRAVELS':
            return {
                ...state,
                isFetching: true
            };
        default:
            return state;
    };
};