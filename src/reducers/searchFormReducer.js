export default (state = {}, {
    type,
    originInputValue,
    originsSelectedId,
    destinationInputValue,
    destinationSelectedId,
    date,
    parametersPanel,
    parametersValue
}) => {
    switch (type) {
        case 'SET_SEARCH_FORM':
            return {
                originInputValue,
                originsSelectedId,
                destinationInputValue,
                destinationSelectedId,
                date,
                parametersPanel,
                parametersValue
            };
        default:
            return state;
    };
};