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

import DashboardContainer from '../containers/DashboardContainer';
import RequireAuth from '../components/auth/RequireAuth';

const Routes = (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path='/login' component={LoginContainer} />
        <Route path='/register' component={RegisterContainer} />
        <RequireAuth>
            <Route path='/dashboard' component={DashboardContainer} />
            <Route path='*' component={NotFoundPage} />
        </RequireAuth>
    </Switch>
);

export default Routes;
