export const setSearchForm = ({
    originInputValue,
    originsSelectedId,
    destinationInputValue,
    destinationSelectedId,
    date,
    parametersPanel,
    parametersValue
}) => ({
        type: 'SET_SEARCH_FORM',
        originInputValue,
        originsSelectedId,
        destinationInputValue,
        destinationSelectedId,
        date,
        parametersPanel,
        parametersValue
});