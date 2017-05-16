//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import {
    fetchUserStats
}
from '../actions';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardBody from '../components/dashboard/DashboardBody';

class DashboardContainer extends React.Component {
    // componentDidMount() {
    //     //fetch data to add to state
    //     console.log("attemping to fetch data");
    //     console.log("token is", this.props.token);
    //     this.props.fetchUserStats(this.props.token);
    // }
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
    //grab the token from?
    return {
        ...state,
        token: state.auth.token
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetchUserStats: (token) => {
            dispatch(fetchUserStats(token));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
