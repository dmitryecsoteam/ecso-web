export default (origins, value) => {
    console.log("Origins from selector: ", origins);
    console.log("Value from selector: ", value);

    if (!!value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : origins.filter((origin) =>
            (
                origin.name.toLowerCase().slice(0, inputLength) === inputValue
            )
        );
    } else {
        return [];
    };
};