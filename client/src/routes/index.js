import React from 'react';
import {
    Route,
    Switch
}
from 'react-router-dom';

import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';

import Dashboard from '../components/Dashboard';
import RequireAuth from '../components/auth/RequireAuth';

const Routes = (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path='/login' component={LoginContainer} />
        <Route path='/register' component={RegisterContainer} />
        <Route path='/dashboard' component={RequireAuth(Dashboard)} />
        <Route path='*' component={NotFoundPage} />
    </Switch>
);

export default Routes;
