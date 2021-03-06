import {
    FETCH_USER_VACCINE_DATA_SUCCESS
}
from '../actions/types';


let INITIAL_VACCINE_STATE = {
    // isFetching: false,
    data: [],
    error: null,
};

function vaccineReducer(state = INITIAL_VACCINE_STATE, action) {
    switch (action.type) {
        case FETCH_USER_VACCINE_DATA_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}
export default vaccineReducer;
