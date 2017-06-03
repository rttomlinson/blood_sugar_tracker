import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider
}
from 'react-redux';
import {
  createStore,
  applyMiddleware
}
from 'redux';
import {
  BrowserRouter as Router
}
from 'react-router-dom';
import App from './components/App';
import routes from './routes';
import reducers from './reducers';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        {routes}
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
