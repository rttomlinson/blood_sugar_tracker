//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardBody from '../components/dashboard/DashboardBody';



class VaccineContainer extends React.Component {
    
    render() {
        return (
            <div>
                Vaccines here
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state;
}


const WrappedVaccineContainer = () => {
    return (
        <div>
            <DashboardHeader />
            <DashboardBody>
                <WiredVaccineContainer />
            </DashboardBody>
        </div>
    );
};

let WiredVaccineContainer = connect(mapStateToProps)(VaccineContainer);

export default WrappedVaccineContainer;