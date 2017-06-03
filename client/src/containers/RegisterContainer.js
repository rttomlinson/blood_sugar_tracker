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
    registerUser
}
from '../actions';
import Register from '../components/Register';

class RegisterContainer extends Component {

    render() {
        return (
            <Register {...this.props} />
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
            console.log("form values", formValues);
            console.log('ownProps', ownProps);
            dispatch(registerUser(formValues, ownProps.history));
        }
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'register'
})(RegisterContainer));
