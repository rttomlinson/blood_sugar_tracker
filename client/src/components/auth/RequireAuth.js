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
    
    componentWillMount(){
        const {
            history,
            isAuthenticated,
        } = this.props;
        if (!isAuthenticated) {
            //set the current url for future redirection
            //dispatch(setRedirectUrl(currentUrl)
            history.replace('/login');
        }
    }
    
    render() {
        console.log("inside require Auth");
        const {children} = this.props;
        return (
            {children}
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}




export default withRouter(connect(mapStateToProps)(RequireAuth));
