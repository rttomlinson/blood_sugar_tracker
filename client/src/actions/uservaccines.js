import 'isomorphic-fetch';
import qs from 'qs';
import apiConfig from '../config/auth';
import fetchHelpers from '../helpers/fetch_helpers';
import {
    FETCH_USER_VACCINE_DATA_SUCCESS
}
from './types';


export function fetchUserVaccineDataSuccess(data) {
    return {
        type: FETCH_USER_VACCINE_DATA_SUCCESS,
        data
    };
}



export function fetchUserVaccineData(token) {
    return function(dispatch) {
        if (!token) {
            token = localStorage.getItem("token");
        }
        return fetch(`${apiConfig.apiServerBaseUrl}/api/user/vaccines?token=${token}`)
            .then(fetchHelpers.checkResponse)
            .then(fetchHelpers.parseJSON)
            .then(json => {
                console.log('parsed response from server', json);
                console.log("should dispatch action to update user");
                dispatch(fetchUserVaccineDataSuccess(json.userVaccines)); 
            })
            .catch(err => {
                // console.error("Error handler should dispatch error");
            });
    }
}
