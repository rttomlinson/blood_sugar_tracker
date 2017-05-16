//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import Statistics from '../components/Statistics';
class StatisticsContainer extends React.Component {
    
    render() {
        return (
            <div>
                <Statistics />
            </div>
        );
    }
}


function mapStateToProps(state) {
    //grab the token from?
    return state;
}

export default connect(mapStateToProps)(StatisticsContainer);