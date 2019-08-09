export const setSearchForm = ({
    originInputValue,
    originSelectedId,
    destinationInputValue,
    destinationSelectedId,
    date,
    parametersPanel,
    parametersValue
}) => ({
        type: 'SET_SEARCH_FORM',
        originInputValue,
        originSelectedId,
        destinationInputValue,
        destinationSelectedId,
        date,
        parametersPanel,
        parametersValue
});