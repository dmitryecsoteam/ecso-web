import gql from 'graphql-tag';

export const TEST_CONNECTION_QUERY = gql`
query destination($_id: Int){
    destination (_id: $_id) {
        _id
    }
}
`;

export const ORIGIN_INPUT_SEARCH = gql`
query originStartsWith($startsWith: String){
    originStartsWith (name: $startsWith) {
        _id,
        name,
        nameEn,
        countryEn
    }
}
`;

export const DESTINATION_INPUT_SEARCH = gql`
query destinationStartsWith($startsWith: String){
    destinationStartsWith (name: $startsWith) {
        _id,
        name,
        nameEn,
        countryEn
    }
}
`;

export const DESTINATION_SEARCH_BY_PARAMETERS = gql`
query destinationRating(
    $museumRating: Int,
    $zooAquaRating: Int,
    $wellnessSpaRating: Int,
    $mountainsRating: Int,
    $beachRating: Int,
    $foodRating: Int,
    $shoppingRating: Int,
    $historicalRating: Int,
    $natureRating: Int
) {
    destinationRating (
        museumRating: $museumRating,
        zooAquaRating: $zooAquaRating,
        wellnessSpaRating: $wellnessSpaRating,
        mountainsRating: $mountainsRating,
        beachRating: $beachRating,
        foodRating: $foodRating,
        shoppingRating: $shoppingRating,
        historicalRating: $historicalRating,
        natureRating: $natureRating
    ) {
        _id
    }
}
`;

export const TRAVELS_SEARCH = gql`
query travel(
    $origin: Int
    $destination: Int
    $date: String
) {
    travel (
        origin: $origin
        destination: $destination
        date: $date
    ) {
        _id
        date
        priceAirplane
        destination {
            _id
            name_en
            country_en
            museumRating
            zooAquaRating
            wellnessSpaRating
            mountainsRating
            beachRating
            foodRating
            shoppingRating
            historicalRating
            natureRating
            museumDescription
            zooAquaDescription
            wellnessSpaDescription
            mountainsDescription
            beachDescription
            foodDescription
            shoppingDescription
            historicalDescription
            natureDescription
        }
    }
}
`;

export const TRAVELS_SEARCH_FULL = gql`
query travelFull(
    $_id: String
) {
    travelFull (
        _id: $_id
    ) {
        _id
        date
        priceAirplane
        destination {
            _id
            name_en
            country_en
            museumRating
            zooAquaRating
            wellnessSpaRating
            mountainsRating
            beachRating
            foodRating
            shoppingRating
            historicalRating
            natureRating
            museumDescription
            zooAquaDescription
            wellnessSpaDescription
            mountainsDescription
            beachDescription
            foodDescription
            shoppingDescription
            historicalDescription
            natureDescription
        }
    }
}
`;