export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_ORIGINS':
            return {
                isFetching: false,
                origins: action.origins
            };
        case 'START_FETCH':
            return { 
                ...state,
                isFetching: true 
            };
        default:
            return state;
    };
};