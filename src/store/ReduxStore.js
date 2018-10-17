import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import originInputReducer from '../reducers/originInputReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState = {
    originInput: {
        origins: [],
        isFetching: false
    }
};

export default () => (
    createStore(
        combineReducers({
            originInput: originInputReducer
        }),
        defaultState,
        composeEnhancers(applyMiddleware(thunk))
    )
);
