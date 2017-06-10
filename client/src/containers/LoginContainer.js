import React, {
    Component
}
from 'react';
import {
    connect
}
from 'react-redux';
import {
    reduxForm
}
from 'redux-form';
import {
    loginUser
}
from '../actions';
import Login from '../components/auth/Login';
import MDSpinner from 'react-md-spinner';
class LoginContainer extends Component {

    render() {
        if (this.props.isFetching) {
            console.log("isFetching show spinner");
            return ( <MDSpinner />);
        }
        if (this.props.isAuthenticated) {
            console.log("We are redirecting you to the dashboard");
            return (
                    <div>
                        <p>Are you (look up user info)? Login with another account</p>
                        <p>We are automatically redirecting to the user dashboard</p>
                        <p>Future funtionality should include checking the previous referral location</p>
                        <MDSpinner />
                    </div>
                );
        }
        
        
        return (
            <Login {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message,
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: (formValues) => {
            dispatch(loginUser(formValues, ownProps.history));
        }
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'login'
})(LoginContainer));
