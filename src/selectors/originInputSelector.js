export default (origins, value) => {

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : origins.filter((origin) =>
        (
            origin.name.some((name) => (
                name.toLowerCase().slice(0, inputLength) === inputValue
            ))
        )
    );
};