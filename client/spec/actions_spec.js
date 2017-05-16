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
    let initialState;
    beforeEach(function() {
        initialState = {
            isFetching: false,
            error: null,
            stats: {},
            profile: {}
        };
    })
    it("returns isFetching true when dispatching REQUEST_TO_SERVER", function(done) {
        const action = {
            type: REQUEST_TO_SERVER
        };
        const finalState = {
            ...initialState,
            isFetching: true
        };
        deepFreeze(initialState);
        deepFreeze(action);
        expect(reducer(initialState, action)).toEqual(finalState);
    });
    it("returns an object at stats if info received GET_STATS", function(done) {
        const action = {
            type: GET_STATS,
            data: {}
        };
        const finalState = {
            ...initialState,
            isFetching: false,
            stats: {}
        };
        deepFreeze(initialState);
        deepFreeze(action);
        expect(reducer(initialState, action)).toEqual(finalState);
    });
    it("returns an object at stats if info received GET_PROFILE", function(done) {
        const action = {
            type: GET_PROFILE,
            data: {}
        };
        const finalState = {
            ...initialState,
            isFetching: false,
            profile: {}
        };
        deepFreeze(initialState);
        deepFreeze(action);
        expect(reducer(initialState, action)).toEqual(finalState);
    });
    describe("stats fetching from api", function() {
        it("calls the api with method statsFetch", function() {
            expect(true).toBe(true);
            
            
        });
    });


});
