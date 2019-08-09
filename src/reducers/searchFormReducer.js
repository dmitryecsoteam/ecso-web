export default (state = {}, {
    type,
    originInputValue,
    originSelectedId,
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
                originSelectedId,
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