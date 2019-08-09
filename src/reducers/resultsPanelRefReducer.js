export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_REF':
            return {
                ref: action.ref
            }
        default:
            return state;
    }
}
