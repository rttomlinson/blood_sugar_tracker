import React from 'react';
import {
    Route,
    Switch
}
from 'react-router-dom';

import App from '../components/App';

import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';
import Login from '../components/auth/Login';

const Routes = (
    <App>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path='/login' component={Login} />
            <Route path='*' component={NotFoundPage} />
        </Switch>
    </App>
);

export default Routes;
