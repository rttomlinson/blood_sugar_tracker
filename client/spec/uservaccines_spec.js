import 'isomorphic-fetch';
import install from 'jasmine-es6';
install();
import deepFreeze from 'deep-freeze';
import vaccineReducer from '../src/reducers/vaccineReducer';
import {FETCH_USER_VACCINE_DATA_SUCCESS} from '../src/actions/types';

it("populates vaccine data", function() {
    const initialState = {
        data: []
    }
    const action = {
        type: FETCH_USER_VACCINE_DATA_SUCCESS,
        data: [{vaccine: 1}, {vaccine: 2}]
    }
    const finalState = {
        data: [{vaccine: 1}, {vaccine: 2}]
    }
    
    deepFreeze(initialState);
    deepFreeze(action);
    expect(vaccineReducer(initialState, action)).toEqual(finalState);
    
})



import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
import fetchMock from 'fetch-mock'
import { fetchUserVaccineData } from '../src/actions/uservaccines';
import apiConfig from '../src/config/auth';

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
    })
    it('creates FETCH VACCINES SUCCESS upon successful status 200', () => {
        let token = "KJSLDKJFLSKDJFS";
        fetchMock.get(`${apiConfig.apiServerBaseUrl}/api/user/vaccines?token=${token}`, {
            status: 200,
            body: {
                userVaccines:[{vaccine: 1}, {vaccine: 2}]
            }
        })
        const expectedActions = [{
            type: FETCH_USER_VACCINE_DATA_SUCCESS,
            data: [{vaccine: 1}, {vaccine: 2}]
        }]
        const store = mockStore({
            userVaccines: []
        })
        // return fetch(`/api/users/vaccines?token=${token}`)
        // .then(response => {
        //     expect(response.status).toEqual(200);
        // })
        return store.dispatch(fetchUserVaccineData(token)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})