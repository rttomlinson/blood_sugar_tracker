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

class LoginContainer extends Component {

    render() {
        return (
            <Login {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message,
        isFetching: state.auth.isFetching
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
