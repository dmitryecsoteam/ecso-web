export default (cities, value) => {

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : cities.filter(city =>
        (
            city.name.some((name) => (
                name.toLowerCase().startsWith(inputValue)
            ))
        )
    ).sort(city => city.nameEn.toLowerCase().startsWith(inputValue) ? -1 : 1);
};