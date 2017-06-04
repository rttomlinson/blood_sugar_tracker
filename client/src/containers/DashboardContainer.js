//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import {
    fetchUserStats
} from '../actions';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardBody from '../components/dashboard/DashboardBody';
                // <DashboardHeader {...this.props}/>
                // <DashboardBody {...this.props}/>
class DashboardContainer extends React.Component {
    
    render() {
        console.log("Trying to render");
        return (
            <div>
                Dashboard Placeholder
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
        token: state.auth.token
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetchStats: (token) => {
            dispatch(fetchUserStats(token));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
