// Sorts array by first property. If values are equal - sorts by second
const sort = (arr, first, second, descFirst = true, descSecond = true) => {

    // Short helper function. Returns:
    // 1:  when a > b
    // -1: when a < b
    // 0:  when a = b
    const cmp = (a, b) => (a > b) - (a < b);

    return arr.sort((a, b) => {

        // if first values are equal push null in second values to the end
        if (!cmp(a[first],b[first])) {
            if (!a[second]) return 1;
            if (!b[second]) return -1;
        }

        return (descFirst ? -cmp(a[first],b[first]) : cmp(a[first],b[first])) || (descSecond ? -cmp(a[second],b[second]) : cmp(a[second],b[second]));
    });
}


export default (travels, { sortBy, desc }) => {

    if (sortBy === 'price') {

        // filter non-null and null priceAirplane travels
        const filtered = travels.filter(i => i.priceAirplane);
        const nulls = travels.filter(i => !i.priceAirplane);

        // sort both arrays. sorting by avgRating must be descending (travels with greater rating first)
        sort(filtered, 'priceAirplane', 'avgRating', desc, true);
        sort(nulls, 'priceAirplane', 'avgRating', true, true);

        // append null priceAirplane to non-null
        return filtered.concat(nulls);

    } else if (sortBy === 'relevance') {

        // sorting by priceAirplane must be ascending (low prices first)
        return sort(travels.slice(), 'avgRating', 'priceAirplane', desc, false);
        
    } else {
        return travels;
    }
}