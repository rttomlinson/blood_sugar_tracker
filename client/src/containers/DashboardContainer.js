//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import {
    fetchUserStats
} from '../actions';
import { fetchVaccineData } from '../actions/uservaccines';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardBody from '../components/dashboard/DashboardBody';
                
class DashboardContainer extends React.Component {
    
    componentDidMount(){
        console.log("dashboard container should mount");
    }
    
    
    render() {
        return (
            <div>
                <DashboardHeader {...this.props}/>
                <DashboardBody {...this.props}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}
// function mapDispatchToProps(dispatch) {
//     return {
//         fetchStats: (token) => {
//             dispatch(fetchUserStats(token));
//         },
//         fetchVaccineData: () => {
//             dispatch(fetchVaccineData());
//         }
//     };
// }

export default connect(mapStateToProps)(DashboardContainer);
