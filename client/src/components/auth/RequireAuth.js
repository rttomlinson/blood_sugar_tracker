import React, {
    Component
}
from 'react';
import {
    connect
}
from 'react-redux';

const RequireAuth = (ComposedComponent) => {
    class Authentication extends Component {
        componentDidMount() {
            const {
                // dispatch,
                // currentURL,
                history,
                isAuthenticated
            } = this.props;
            if (!isAuthenticated) {
                //set the current url for future redirection
                //dispatch(setRedirectUrl(currentUrl)
                history.replace('/login');
            }
        }
        componentDidUpdate() {
            const {
                // dispatch,
                // currentURL,
                history,
                isAuthenticated
            } = this.props;
            if (!isAuthenticated) {
                //set the current url for future redirection
                //dispatch(setRedirectUrl(currentUrl)
                history.replace('/login');
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }
    return connect(mapStateToProps)(Authentication);
};
export default RequireAuth;
