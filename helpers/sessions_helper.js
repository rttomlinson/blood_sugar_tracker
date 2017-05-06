const SessionsHelper = {};


SessionsHelper.loginPath = () => '/login';
SessionsHelper.logoutPath = () => '/logout?_method=delete';

module.exports = SessionsHelper;
