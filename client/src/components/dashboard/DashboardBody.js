import React from 'react';
import {
    Switch,
    Route
}
from 'react-router-dom';
import {
    connect
}
from 'react-redux';
import StatisticsContainer from '../../containers/StatisticsContainer';
import ProfileContainer from '../../containers/ProfileContainer';
import HomePage from '../pages/HomePage';

const DashboardBody = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.path}/profile`} component={ProfileContainer} />
            <Route path={`${match.path}/statistics`} component={StatisticsContainer} />
            <Route path='*' component={HomePage} />
        </Switch>
    );
};
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(DashboardBody);
