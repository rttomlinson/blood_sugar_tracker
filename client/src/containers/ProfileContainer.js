//need to fetch all info from server with token
import React from 'react';
import {
    connect
}
from 'react-redux';
import Profile from '../components/Profile';
class ProfileContainer extends React.Component {
    
    render() {
        return (
            <div>
                <Profile />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ProfileContainer);