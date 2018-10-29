export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_DESTINATIONS':
            return {
                isFetching: false,
                destinations: action.destinations
            };
        case 'START_FETCH_DESTINATIONS':
            return { 
                ...state,
                isFetching: true 
            };
        default:
            return state;
    };
};