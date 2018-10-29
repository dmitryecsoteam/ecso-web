import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import originInputReducer from '../reducers/originInputReducer';
import destinationInputReducer from '../reducers/destinationInputReducer';
import travelsReducer from '../reducers/travelsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState = {
    originInput: {
        origins: [],
        isFetching: false
    },
    destinationInput: {
        destinations: [],
        isFetching: false
    },
    travels: {
        result: [],
        isFetching: false
    }
};

export default () => (
    createStore(
        combineReducers({
            originInput: originInputReducer,
            destinationInput: destinationInputReducer,
            travels: travelsReducer
        }),
        defaultState,
        composeEnhancers(applyMiddleware(thunk))
    )
);
