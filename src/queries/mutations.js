import gql from 'graphql-tag';

export const SIGNUP_USER = gql`
mutation signupUser($email: String, $password: String, $name: String){
    signupUser (email: $email, password: $password, name: $name) {
        token
    }
}
`;

export const SIGNIN_USER = gql`
mutation signinUser($email: String, $password: String){
    signinUser (email: $email, password: $password) {
        token
    }
}
`;

export const DELETE_NOTIFICATION = gql`
mutation deleteNotification($id: String){
    deleteNotification (id: $id) {
        notifications {
            origin { nameEn }
            destination { nameEn }
            travelId
            date
            priceHotelLast
            priceAirplaneLast
        }
    }
}
`;

export const ADD_NOTIFICATION = gql`
mutation addNotification($id: String, $date: String, $origin: Int, $destination: Int) {
    addNotification (id: $id, date: $date, origin: $origin, destination: $destination) {
        notifications {
            travelId
            date 
            priceAirplaneLast
            priceHotelLast
        }
    }
}
`;