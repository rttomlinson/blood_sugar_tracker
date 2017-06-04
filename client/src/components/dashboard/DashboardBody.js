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
