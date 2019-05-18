export const numberOfNonZeroParams = (parameters) => {
    let count = 0;
    for (let parameter in parameters) {
        if (parameters[parameter]) count++;
    }
    return count;
};