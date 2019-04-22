export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_FILTER': return { sortBy: action.sortBy, desc: action.desc };
        default: return state;
    }
}