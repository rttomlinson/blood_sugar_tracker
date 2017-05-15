//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardBody from '../components/dashboard/DashboardBody';
class DashboardContainer extends React.Component {
    
    render() {
        console.log('props from dashboard container', this.props);
        return (
            <div>
                <DashboardHeader />
                <DashboardBody {...this.props}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(DashboardContainer);