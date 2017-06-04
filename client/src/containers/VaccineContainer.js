//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardBody from '../components/dashboard/DashboardBody';
import DashboardContainer  from './DashboardContainer';


class VaccineContainer extends React.Component {
    
    render() {
        const userVaccines = this.props.userVaccines;
        console.log(userVaccines);
        return (
            <div>
                Vaccines here
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        userVaccines: state.userVaccines.data
    };
}


const WrappedVaccineContainer = () => {
    return (
        <DashboardContainer>
            <WiredVaccineContainer />
        </DashboardContainer>
    );
};

let WiredVaccineContainer = connect(mapStateToProps)(VaccineContainer);

export default WrappedVaccineContainer;