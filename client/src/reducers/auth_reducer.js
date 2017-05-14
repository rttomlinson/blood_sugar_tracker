import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    REQUEST_TO_SERVER
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
        default:
            return state;
    }

}


export default userAuth;
