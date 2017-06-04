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

import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import {
  BrowserRouter as Router
}
from 'react-router-dom';
import DashboardContainer from '../containers/DashboardContainer';
import RequireAuth from '../components/auth/RequireAuth';
// import Footer from './Footer';
// <Footer />


class App extends Component {
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
                  <Route path='/dashboard' component={DashboardContainer} />
                  <Route path='*' component={NotFoundPage} />
              </RequireAuth>
              </Switch>
          </div>
      </Router>

    );
  }
}

export default App;
