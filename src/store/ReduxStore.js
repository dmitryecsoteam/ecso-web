import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import originInputReducer from '../reducers/originInputReducer';
import destinationInputReducer from '../reducers/destinationInputReducer';
import travelsReducer from '../reducers/travelsReducer';
import searchFormReducer from '../reducers/searchFormReducer';
import filterReducer from '../reducers/filterReducer';
import notificationListReducer from '../reducers/notificationListReducer';
import resultsPanelRefReducer from '../reducers/resultsPanelRefReducer';
import moment from 'moment';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const defaultState = {
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
        isFetching: false,
        isInitEmptyResult: true
    },
    searchForm: {
        originInputValue: '',
        originSelectedId: 0,
        destinationInputValue: '',
        destinationSelectedId: 0,
        date: moment(),
        parametersPanel: false,
        parametersValue: {
            Beach: 0,
            Food: 0,
            Museum: 0,
            Nature: 0,
            Shopping: 0,
            Nightlife: 0
        }
    },
    filter: {
        sortBy: 'relevance',
        desc: true
    },
    notificationList: {
        errorTravelId: ''
    },
    resultsPanelRef: {
        ref: ''
    }
};

export default () => (
    createStore(
        combineReducers({
            originInput: originInputReducer,
            destinationInput: destinationInputReducer,
            travels: travelsReducer,
            searchForm: searchFormReducer,
            filter: filterReducer,
            notificationList: notificationListReducer,
            resultsPanelRef: resultsPanelRefReducer
        }),
        defaultState,
        composeEnhancers(applyMiddleware(thunk))
    )
);
