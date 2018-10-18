import gql from 'graphql-tag';

export const ORIGIN_INPUT_SEARCH = gql`
query originStartsWith($name: String){
    originStartsWith (name: $name) {
        _id,
        name,
        name_en,
        country_en
    }
}
`;

export const DESTINATION_INPUT_SEARCH = gql`
query destinationStartsWith($name: String){
    destinationStartsWith (name: $name) {
        _id,
        name,
        name_en,
        country_en
    }
}
`;

export const TEST_CONNECTION_QUERY = gql`
query destination($_id: Int){
    destination (_id: $_id) {
        _id
    }
}
`;