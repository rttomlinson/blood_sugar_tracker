//need to connect all the reducers
import {
    combineReducers
}
from 'redux';
//import actions
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    PROTECTED_TEST
}
from '../actions/types';


let INITIAL_AUTH_STATE = {
    isFetching: false,
    isAuthenticated: false,
    error: null,
    message: null
};


function userAuth(state = INITIAL_AUTH_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                error: null
            };
        case UNAUTH_USER:
            return {
                ...state,
                isAuthenticated: false
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: "Error occurred during authorization"
            };
        default:
            return state;
    }

}


export default combineReducers({
    userAuth
});
