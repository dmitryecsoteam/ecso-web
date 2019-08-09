module.exports = {
    "setupFiles": [
        "<rootDir>/src/tests/setupTests.js"
    ],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/tests/__mocks__/fileMock.js",
        "\\.(css|scss)$": "identity-obj-proxy"
    },
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "clearMocks": true
}