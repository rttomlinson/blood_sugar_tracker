import 'isomorphic-fetch';
import qs from 'qs';
import apiConfig from '../config/auth';
import fetchHelpers from '../helpers/fetch_helpers';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    REQUEST_TO_SERVER,
    GET_PROFILE,
    GET_STATS,
    ADD_TOKEN,
    GET_INFO_ERROR
}
from './types';

//------------------------
//Server call helper
//-----------------------
export function requestToServer() {
    return {
        type: REQUEST_TO_SERVER,
    };
}

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

export function getStats(data) {
    return {
        type: GET_STATS,
        data
    };
}

export function getProfile(data) {
    return {
        type: GET_PROFILE,
        data
    };
}

export function infoError(error) {
    return {
        type: GET_INFO_ERROR,
        error
    };
}

export function addToken(data) {
    return {
        type: ADD_TOKEN,
        data
    };
}






//--------------------------
//Async Server Call - loginUser - auth: state modifier
//--------------------------
export function loginUser({
    email,
    password
}, history) {
    return (dispatch) => {
        //attempt to auth user on api server
        dispatch(requestToServer());
        console.log("attempting to login user");
        //send info to server and expect to get token back
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });
        const loginOptions = {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: myHeaders

        };
        fetch(`${apiConfig.apiServerBaseUrl}/login`, loginOptions)
            .then(fetchHelpers.checkResponse)
            .then(fetchHelpers.parseJSON)
            .then(json => {
                console.log('parsed response from server', json);
                console.log("should dispatch action to update user");
                dispatch(authUser(json)); //isAuthenticated gets set to true in the auth state
                
                //would it be okay to dispatch an action to load the dashboard here since we have the token?
                dispatch(addToken(json.token));
                
                //route them to the dashboard
                history.push('dashboard');
            })
            .catch(err => {
                console.error("Error handler should dispatch error");
                dispatch(authError(err)); //isAuthenticated gets set to true in the auth state
                history.push('login');
            });
    };
}



//--------------------------
//Async Server Call - registerUser -- auth: state modifier
//--------------------------
export function registerUser({
    email,
    password,
    passwordconfirm
}, history) {
    return (dispatch) => {
        //attempt to auth user on api server
        dispatch(requestToServer());
        console.log("attempting to register user");
        //send info to server and expect to get token back
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });
        const loginOptions = {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                passwordconfirm
            }),
            headers: myHeaders

        };
        fetch(`${apiConfig.apiServerBaseUrl}/user/new`, loginOptions)
            .then(fetchHelpers.checkResponse)
            .then(fetchHelpers.parseJSON)
            .then(json => {
                console.log('parsed response from server', json);
                console.log("should dispatch action to update state user");
                dispatch(authUser(json)); //isAuthenticated gets set to true in the auth state
                //route them to the dashboard
                history.push('dashboard');
            })
            .catch(err => {
                console.error("Error handler should dispatch error");
                dispatch(authError(err)); //isAuthenticated gets set to true in the auth state
                history.push('register');
            });
    };
}


//--------------------------
//Async Server Call - fetchUserStats -- info: state modifier
//--------------------------
export function fetchUserStats(
    token
) {
    return (dispatch) => {
        //expect a token
        if (!token) {
            //return an error
        }
        //attempt to auth user on api server
        dispatch(requestToServer());
        //send info to server and expect to get json
        //make qs of token
        fetch(`${apiConfig.apiServerBaseUrl}/api/user/stats?${qs.stringify({token})}`)
            .then(fetchHelpers.checkResponse)
            .then(fetchHelpers.parseJSON)
            .then(json => {
                console.log('parsed response from server', json);
                console.log("should dispatch action to update user");
                dispatch(getStats(json.data)); //isAuthenticated gets set to true in the auth state
                //route them to the dashboard
            })
            .catch(err => {
                console.error("Error handler should dispatch error");
                dispatch(infoError(err)); //isAuthenticated gets set to true in the auth state
            });
    };
}
