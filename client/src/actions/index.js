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

export function authUser() {
    return {
        type: AUTH_USER
    };
}

export function authError(data) {
    return {
        type: AUTH_ERROR,
        data
    };
}

export function unauthUser() {
    return {
        type: UNAUTH_USER
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







//--------------------------
//Async Server Call - loginUser - auth: state modifier
//--------------------------
export function loginUser({
    email,
    password
}) {
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
        return fetch(`${apiConfig.apiServerBaseUrl}/login`, loginOptions)
            .then(fetchHelpers.checkResponse)
            .then(fetchHelpers.parseJSON)
            .then(json => {
                console.log('parsed response from server', json);
                console.log("should dispatch action to update user");
                dispatch(authUser()); //isAuthenticated gets set to true in the auth state
                
                //save token in localStorage
                localStorage.setItem("token", json.token);

                //route them to the dashboard
                window.location = '/dashboard';
            })
            .catch(err => {
                console.error("Error handler should dispatch error");
                dispatch(authError(err)); //isAuthenticated gets set to true in the auth state
                window.location = '/login';
            });
    };
}


export function clearTokenAndUnauth() {
    return function(dispatch) {
        localStorage.removeItem('token');
        dispatch(unauthUser());
    }
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
        return fetch(`${apiConfig.apiServerBaseUrl}/user/new`, loginOptions)
            .then(fetchHelpers.checkResponse)
            .then(fetchHelpers.parseJSON)
            .then(json => {
                console.log('parsed response from server', json);
                console.log("should dispatch action to update state user");
                dispatch(authUser(json)); //isAuthenticated gets set to true in the auth state
                //route them to the dashboard
                localStorage.setItem("token", json.token);
                
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
        return fetch(`${apiConfig.apiServerBaseUrl}/api/user/stats?${qs.stringify({token})}`)
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
