import React from 'react';
import {
    Link
}
from 'react-router-dom';

const Dashboard = () => {

    return (
        <div>
            Dashboard!
            <Link to="login">Login</Link>
        </div>
    );
};

export default Dashboard;
