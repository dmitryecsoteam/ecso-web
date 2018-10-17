import gql from 'graphql-tag';

export const ORIGIN_INPUT_SEARCH = gql`
query originStartsWith($name: String){
    originStartsWith (name: $name) {
        name,
        country
    }
}
`