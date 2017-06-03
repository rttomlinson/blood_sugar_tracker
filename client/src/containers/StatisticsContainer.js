//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import Statistics from '../components/Statistics';

function mapStateToProps(state) {
    console.log("inside stats container, expect info on state.info.stats");
    console.log(state.info.stats);
    return {
        twentyFourHourBloodSugar: state.info.stats.TwentyFourHourBloodSugar,
        twentyFourHourAvg: state.info.stats.TwentyFourHourAvg,
        lastFiftyBloodSugar: state.info.stats.lastFiftyBloodSugar
    };
}

export default connect(mapStateToProps)(Statistics);