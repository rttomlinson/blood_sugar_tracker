import React, {
  Component
}
from 'react';
import '../App.css';
import Header from './Header';
import {
    Route,
    Switch
}
from 'react-router-dom';
import {connect} from 'react-redux';
import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import {
  BrowserRouter as Router
}
from 'react-router-dom';
import VaccineContainer from '../containers/VaccineContainer';
import RequireAuth from '../components/auth/RequireAuth';
import {authUser} from '../actions/index';
// import Footer from './Footer';
// <Footer />
import StatisticsContainer from '../containers/StatisticsContainer';
import ProfileContainer from '../containers/ProfileContainer';

class App extends Component {
  
  componentDidMount(){
    //check for token in localStorage
    console.log("app should mount");
    let token = localStorage.getItem("token");
    if (token && !this.props.auth.isAuthenticated) {
      this.props.authUser();
    }
  }
  render() {
    return (
      <Router>
          <div>
              <Header />
              <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path='/login' component={LoginContainer} />
              <Route path='/register' component={RegisterContainer} />
              <RequireAuth>
                  <Switch>
                    <Route path={`/dashboard/profile`} component={ProfileContainer} />
                    <Route path={`/dashboard/statistics`} component={StatisticsContainer} />
                    <Route path='/dashboard' component={VaccineContainer} />
                    <Route path='*' component={NotFoundPage} />
                  </Switch>
              </RequireAuth>
              </Switch>
          </div>
      </Router>

    );
  }
}

function mapStateToProps(state) {
  return state;
}


function mapDispatchToProps(dispatch) {
  return {
    authUser : () => {
      dispatch(authUser());
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
