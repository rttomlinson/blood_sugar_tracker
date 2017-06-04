import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider
}
from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
}
from 'redux';
import App from './components/App';
import reducers from './reducers';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

let createStoreEnhancers;
if (process.env.NODE_ENV === 'production') {
    createStoreEnhancers = applyMiddleware(thunk);
}
else {
    createStoreEnhancers = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}


const store = createStore(reducers, createStoreEnhancers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
