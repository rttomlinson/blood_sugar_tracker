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
// <Switch>
//             <Route path={`${match.path}/profile`} component={ProfileContainer} />
//             <Route path={`${match.path}/statistics`} component={StatisticsContainer} />
//             <Route path='*' component={HomePage} />
//         </Switch>
const DashboardBody = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(DashboardBody);
