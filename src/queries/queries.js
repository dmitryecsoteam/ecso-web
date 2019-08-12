import gql from 'graphql-tag';

export const TEST_CONNECTION_QUERY = gql`
query destination($_id: Int){
    destination (_id: $_id) {
        _id
    }
}
`;

export const ORIGIN_INPUT_SEARCH_EN = gql`
query originStartsWith($startsWith: String){
    originStartsWith (name: $startsWith) {
        _id,
        name,
        nameEn,
        countryEn
    }
}
`;

export const DESTINATION_INPUT_SEARCH_EN = gql`
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
    $beachRating: Int,
    $foodRating: Int,
    $museumRating: Int,
    $natureRating: Int,
    $shoppingRating: Int,
    $nightlifeRating: Int
) {
    destinationRating (
        beachRating: $beachRating,
        foodRating: $foodRating,
        museumRating: $museumRating,
        natureRating: $natureRating,
        shoppingRating: $shoppingRating,
        nightlifeRating: $nightlifeRating
    ) {
        _id
    }
}
`;

export const TRAVELS_SEARCH_EN = gql`
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
        carDistance
        destination {
            _id
            nameEn
            countryEn
            museumRating
            beachRating
            foodRating
            shoppingRating
            natureRating
            nightlifeRating
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
        priceHotel
        carDuration
        carDistance
        weatherTempStatMin
        weatherTempStatMax
        destination {
            _id
            nameEn
            countryEn
            museumRating
            beachRating
            foodRating
            shoppingRating
            natureRating
            nightlifeRating
            museumDescription
            beachDescription
            foodDescription
            shoppingDescription
            natureDescription
            nightlifeDescription
            cityDescription
            population
            foundingDate
        }
        origin {
            _id
            nameEn
            countryEn
        }
    }
}
`;

// export const GET_CURRENT_USER = gql`
// query currentUser() {
//     currentUser {
//         email
//         name
//     }
// }
// `;

export const GET_CURRENT_USER = gql`
query {
    currentUser {
        email
        name
    }
}
`;

export const GET_NOTIFICATIONS = gql`
query {
    getNotifications {
        travelId
        origin {
            nameEn
        }
        destination {
            nameEn
        }
        date
        priceHotelLast
        priceAirplaneLast
    }
}
`;

export const GET_BEST_DEALS = gql`
query getBestDeals ($limit: Int, $months: Int) {
    getBestDeals (limit: $limit, months: $months) {
        _id
        date
        priceAirplane
        origin {
            nameEn
            countryEn
        }
        destination {
            nameEn
            countryEn
        }
    }
}
`;