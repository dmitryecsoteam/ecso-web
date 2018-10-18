export default (destinations, value) => {

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : destinations.filter((destination) =>
        (
            destination.name.some((name) => (
                name.toLowerCase().slice(0, inputLength) === inputValue
            ))
        )
    );
};