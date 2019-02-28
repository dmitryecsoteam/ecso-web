export const client = {
    query: jest.fn(() => {
        return Promise.resolve({ data: {
        destinationStartsWith: ['X']
    }})})
}

