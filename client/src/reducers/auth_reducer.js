import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    REQUEST_TO_SERVER,
    ADD_TOKEN
}
from '../actions/types';


let INITIAL_AUTH_STATE = {
    isFetching: false,
    isAuthenticated: false,
    error: null,
};

function userAuth(state = INITIAL_AUTH_STATE, action) {
    switch (action.type) {
        case REQUEST_TO_SERVER:
            return {
                ...state,
                isFetching: true,
            };
        case AUTH_USER:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                error: null,
                token: action.data.token
            };
        case UNAUTH_USER:
            return {
                ...state,
                isAuthenticated: false
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: "Error occurred during authorization",
                isFetching: false
            };
        case ADD_TOKEN:
            return {
                ...state,
                token: action.data
            };
        default:
            return state;
    }
}
export default userAuth;
