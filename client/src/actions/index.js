import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    PROTECTED_TEST
}
from './types';


export function authUser(data) {
    return {
        type: AUTH_USER,
        data
    };
}

export function authError(data) {
    return {
        type: AUTH_ERROR,
        data
    };
}

export function unauthUser(data) {
    return {
        type: UNAUTH_USER,
        data
    };
}



export function requestAuth({
    email,
    password
}) {
    return (dispatch) => {
        //attempt to auth user on api server
        console.log("attempting to auth user");

    };
}
