require('isomorphic-fetch');
const backendBaseUrl = "https://personal-projects-rttomlinson.c9users.io:8081"
import install from 'jasmine-es6';
install();
import deepFreeze from 'deep-freeze';
import reducer from '../src/reducers/info_reducer';
const {
    GET_STATS,
    GET_PROFILE,
    TEST_ACTION,
    ERROR,
    REQUEST_TO_SERVER
} = require('../src/actions/types');

describe("info reducer", function() {
    it("returns isFetching true when dispatching REQUEST_TO_SERVER", function(done) {
        const initialState = {
            isFetching: false
        };
        const action = {
            type: REQUEST_TO_SERVER
        };
        const finalState = {
            isFetching: true
        };
        deepFreeze(initialState);
        deepFreeze(action);
        expect(reducer(initialState, action)).toEqual(finalState);
    });
    it("returns an object at stats if info received GET_STATS", function(done) {
        const initialState = {
            isFetching: true
        };
        const action = {
            type: GET_STATS,
            data: {}
        };
        const finalState = {
            isFetching: false,
            stats: {},
            error: null
        };
        deepFreeze(initialState);
        deepFreeze(action);
        expect(reducer(initialState, action)).toEqual(finalState);
    });
    it("returns an object at stats if info received GET_PROFILE", function(done) {
        const initialState = {
            isFetching: true
        };
        const action = {
            type: GET_PROFILE,
            data: {}
        };
        const finalState = {
            isFetching: false,
            profile: {},
            error: null
        };
        deepFreeze(initialState);
        deepFreeze(action);
        expect(reducer(initialState, action)).toEqual(finalState);
    });
});
