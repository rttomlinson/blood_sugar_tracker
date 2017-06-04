import React, {
    Component
}
from 'react';
import {
    connect
}
from 'react-redux';
import {withRouter} from 'react-router-dom';

class RequireAuth extends Component {
    
    render() {
        const {children, history, isAuthenticated} = this.props;
        if (!isAuthenticated) {
            return (
                <div>
                    <p>Doesn't look like you're logged in yet. We'll take you automatically in 15 seconds.</p>
                    <button onClick={() => console.log("redirect to /login")}>Click here to go right now</button>
                    <button onClick={() => console.log("canceling redirect")}>Click here to stay here</button>
                </div>
                
            );
        }
        console.log("trying to render children");
        return (
            <div>
                {children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}




export default withRouter(connect(mapStateToProps)(RequireAuth));
