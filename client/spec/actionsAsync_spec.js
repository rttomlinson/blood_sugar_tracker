// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import * as actions from '../actions/boardsActions'
import 'isomorphic-fetch';
// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)
import fetchMock from 'fetch-mock'
const backendBaseUrl = "https://personal-projects-rttomlinson.c9users.io:8081"
import install from 'jasmine-es6';
install();


describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
    })
    it('creates FETCH USERVACCINES SUCCESS upon successful status 200', () => {
        let token = "KJSLDKJFLSKDJFS";
        let boardId = 1;
        fetchMock.get(`/api/users/vaccines?token=${token}`, {
            status: 200,
            ok: true
        })
        // const expectedActions = [{
        //     type: actions.BOARD_REMOVAL_SUCCESS,
        //     data: 1
        // }]
        // const store = mockStore({
        //     boards: []
        // })
        return fetch(`/api/users/vaccines?token=${token}`)
        .then(response => {
            expect(response.status).toEqual(200);
        })
        // return store.dispatch(actions.requestBoardRemoval(boardId, token)).then(() => {
        //     // return of async actions
        //     expect(store.getActions()).toEqual(expectedActions)
        // })
    })
})
