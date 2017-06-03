import React from 'react'
import {
    Field,
}
from 'redux-form';

const Register = ({
    onSubmit,
    handleSubmit,
    isFetching,
    errorMessage
}) => {
    function renderAlert() {
        if (errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong>{errorMessage}</span>
                </div>
            );
        }
        else {
            return null;
        }
    }

    return (
        <div className="Register">
            {isFetching ? <span>Submitting...</span> : (
            <form onSubmit={handleSubmit(onSubmit)}>
            {renderAlert()}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name='email' className='form-control' component='input' type='text'/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name='password' className='form-control' component='input' type='password'/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordconfirm">Confirm Password</label>
                    <Field name='passwordconfirm' className='form-control' component='input' type='password'/>
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
            )}
        </div>
    );
};

export default Register;
