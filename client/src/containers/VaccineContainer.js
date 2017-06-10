//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import DashboardContainer  from './DashboardContainer';
import { fetchUserVaccineData } from '../actions/uservaccines';

class VaccineContainer extends React.Component {
    
    //Need to load the vaccine in the state if not already present
    componentDidMount(){
        //if the length of the vaccines array is zero we can assume that no data has been loaded at this time
        if (this.props.userVaccines.data.length === 0) {
            this.props.fetchUserVaccineData();
        }
    }
    
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
        userVaccines: state.userVaccines
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetchUserVaccineData: () => {
            dispatch(fetchUserVaccineData());
        }
    };
}


const WrappedVaccineContainer = () => {
    return (
        <DashboardContainer>
            <WiredVaccineContainer />
        </DashboardContainer>
    );
};

let WiredVaccineContainer = connect(mapStateToProps, mapDispatchToProps)(VaccineContainer);

export default WrappedVaccineContainer;