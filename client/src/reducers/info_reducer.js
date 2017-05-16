import {
    GET_STATS,
    GET_PROFILE,
    TEST_ACTION,
    GET_INFO_ERROR,
    REQUEST_TO_SERVER
}
from '../actions/types';


let INITIAL_INFO_STATE = {
    isFetching: false,
    error: null,
    stats: {},
    profile: {}
};

function infoFetch(state = INITIAL_INFO_STATE, action) {
    switch (action.type) {
        case REQUEST_TO_SERVER:
            return {
                ...state,
                isFetching: true,
            };
        case GET_STATS:
            return {
                ...state,
                isFetching: false,
                stats: action.data,
                error: null
            };
        case GET_PROFILE:
            return {
                ...state,
                error: null,
                profile: action.data,
                isFetching: false
            };
        case GET_INFO_ERROR:
            return {
                ...state,
                error: "Error occurred during fetching",
                isFetching: false
            };
        case TEST_ACTION:
            console.log("TEST_ACTION RECEIVED");
            return state;
        default:
            return state;
    }
}
export default infoFetch;
